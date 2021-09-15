//
//  RNBiometrics.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 10/09/2021.
//

import Foundation
import LocalAuthentication


@objc(RNBiometrics)

class RNBiometrics: NSObject {
  
  private let KEY_SIZE = 2048;
  private let KEY_TYPE = kSecAttrKeyTypeRSA as String;

  @objc
  func isSensorAvailable(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let context = LAContext();
    var error: NSError?;
    let isAvailable = context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error);
    if isAvailable {
      resolve(["available": isAvailable, "biometryType": context.biometryType])
    } else if error != nil {
      NSLog("BIO TEST \(String(describing: error))")
      reject("Error checking availability", error?.localizedDescription, error);
//      reject("Error checking availability", "ERROR_EVALUATING_BIOMETRICS", error);
    }
  }

  @objc
  func showSimplePrompt(_ message: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    let context = LAContext();
    context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: message) { success, error in
      if success {
        resolve(["success": success]);
      } else {
        NSLog("BIO TEST \(String(describing: error))");
        reject("error displaying", "ERROR_DISPLAYING_BIOMETRIC", error);
      }
    }
  }

  @objc
  func createKeys(_ keyAlias: String, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    do {
      let publicKey = try generateBiometricKeys(keyAlias);
      var error: Unmanaged<CFError>?;
      let keyData = SecKeyCopyExternalRepresentation(publicKey, &error);
      if keyData == nil && error != nil {
        throw BiometricsError.keyGeneration;
      }
      let data = keyData! as Data;
      let extPublicKey = ExportManager().exportPublicKeyToDER(data, keyType: KEY_TYPE, keySize: KEY_SIZE)
      resolve(["publicKey": extPublicKey.base64EncodedString() as String]);
    } catch {
      reject("Key Generation Error", "ERROR_GENERATING_BIOMETRICS_KEYS", error);
    }
  }

  @objc
  func signPayload(_ params: NSDictionary, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let p = params as! [String: Any];

    let keyAlias = p["keyAlias"] as! String;
    let promptMessage = p["promptMessage"] as! String;
    let payload = p["payload"] as! String;

    let payloadData = payload.data(using: .utf8);
    var error: Unmanaged<CFError>?;
    let SIGN_ALGORITHM: SecKeyAlgorithm = .rsaSignatureMessagePKCS1v15SHA256;

    do {
      let key = try getPrivateKey(keyAlias, promptMessage);
      guard SecKeyIsAlgorithmSupported(key, .sign, SIGN_ALGORITHM) else {
        throw BiometricsError.algorithmNotSupported
      }
      guard let signature = SecKeyCreateSignature(key, SIGN_ALGORITHM, payloadData! as CFData, &error) as Data? else {
        throw BiometricsError.signature
      }
      resolve(["signature": signature.base64EncodedString() as String]);
    } catch {
      NSLog("\(error) test " )
      reject("", "", error);
    }

  }

  @objc
  func deleteKeys(_ keyAlias: String, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let _ = "\(keyAlias).private";
  }

  private func getPrivateKey(_ keyAlias: String, _ promptMessage: String) throws -> SecKey {
    let keyApplicationTag = "\(keyAlias).private";
    NSLog("\(keyApplicationTag) test")
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: keyApplicationTag,
      kSecUseOperationPrompt as String: promptMessage,
      kSecReturnRef as String: true
    ]
    //Get Keychain Item
    var item: CFTypeRef?;
    let status = SecItemCopyMatching(query as CFDictionary, &item);
    guard status == errSecSuccess else {
      //failed
      throw BiometricsError.keyNotFound
    }
    return item as! SecKey;

  }

  private func generateBiometricKeys(_ keyAlias: String) throws -> SecKey {
    //Key Identification
    let privateKeyTag = "\(keyAlias).private";
    NSLog("\(privateKeyTag) test")
    var error: Unmanaged<CFError>?;
    //creating secure access contol object
    let access = SecAccessControlCreateWithFlags(nil, kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly, .biometryAny, &error);
    if access == nil && error != nil {
      //failed
      throw error!.takeRetainedValue() as Error;
    } else {

      let privateKeyAttr: [String: Any] = [
        kSecAttrIsPermanent as String: true,
        kSecAttrApplicationTag as String: privateKeyTag,
        kSecAttrAccessControl as String: access as Any,
        kSecUseAuthenticationUI as String: kSecUseAuthenticationUIAllow
      ];

      let attributes: [String: Any] = [
        kSecClass as String: kSecClassKey,
        kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
        kSecAttrKeySizeInBits as String: KEY_SIZE,
        kSecAttrCanSign as String: true,
        kSecPrivateKeyAttrs as String: privateKeyAttr
      ]

      var keyGenErr: Unmanaged<CFError>?;

      guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &keyGenErr) else {
        throw keyGenErr!.takeRetainedValue() as Error;
      }

      guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
        throw BiometricsError.keyGeneration
      }
      return publicKey;
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
}
