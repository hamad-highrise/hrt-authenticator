//
//  RNKeyGen.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 08/09/2021.
//

import Foundation


@objc(RNKeyGen)

class RNKeyGen: NSObject {
  private let KEY_SIZE = 2048;

  @objc
  func createKeys(_ keyAlias: String, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    do {
      let publicKey = try generateKeys(keyAlias);
      var error: Unmanaged<CFError>?;
      let keyData = SecKeyCopyExternalRepresentation(publicKey, &error);
      if keyData == nil && error != nil {
        throw KeyGenError.keyGeneration;
      }
      let data = keyData! as Data;
      resolve(["publicKey": data.base64EncodedString() as String]);
    } catch {
      reject("Unable to generate keys", error.localizedDescription, error);
    }
  }

  @objc
  func signPayload(_ params: NSDictionary, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let p = params as! [String: Any];

    let keyAlias = p["keyAlias"] as! String;
    let payload = p["payload"] as! String;

    let payloadData = payload.data(using: .utf8);
    var error: Unmanaged<CFError>?;
    let SIGN_ALGORITHM: SecKeyAlgorithm = .rsaSignatureMessagePKCS1v15SHA256;

    do {
      let key = try getPrivateKey(keyAlias);
      guard SecKeyIsAlgorithmSupported(key, .sign, SIGN_ALGORITHM) else {
        throw KeyGenError.algorithmNotSupported
      }
      guard let signature = SecKeyCreateSignature(key, SIGN_ALGORITHM, payloadData! as CFData, &error) as Data? else {
        throw KeyGenError.signature
      }
      resolve(["signature": signature.base64EncodedString() as String, "success": true]);
    } catch {
      reject("Error", "ERROR_SIGNING", error);
    }
  }

  private func getPrivateKey(_ keyAlias: String) throws -> SecKey {
    let privateKeyTag = "\(keyAlias).private";
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: privateKeyTag,
      kSecReturnRef as String: true
    ];
    var item: CFTypeRef?;
    let status = SecItemCopyMatching(query as CFDictionary, &item);
    guard status == errSecSuccess else {
      throw KeyGenError.keyNotFound;
    }
    return item as! SecKey;
  }

  private func generateKeys(_ keyAlias: String) throws -> SecKey {
    // adding postfixes for identifiers
    let privateKeyTag = "\(keyAlias).private";
    let privateKeyAttrs: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: privateKeyTag,
      kSecAttrIsPermanent as String: true
    ]
    let attributes: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
      kSecAttrKeySizeInBits as String: 2048,
      kSecAttrCanSign as String: true,
      kSecPrivateKeyAttrs as String: privateKeyAttrs
    ]
    var error: Unmanaged<CFError>?;
    guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
      throw error!.takeRetainedValue() as Error;
    }
    guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
      throw KeyGenError.keyGeneration
    }
    return publicKey;
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
}
