//
//  RNCipher.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 08/09/2021.
//

import Foundation
import CryptoKit

@available(iOS 13.0, *)
@objc(RNCipher)

class RNCipher: NSObject {


  @objc
  func encrypt(_ params: NSDictionary, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    NSLog("hello");
    guard let p = params as? [String: Any] else {
      reject("Invalid Params Object", "INVALID_PARAMS", nil);
      return;
    }

    let payload =  p["payload"] as! String;
    let keyAlias = p["keyAlias"] as! String;
    do {
      let payloadData = payload.data(using: .utf8)!;
      let key = try getKey(keyAlias);
      let sealBox = try AES.GCM.seal(payloadData, using: key);
      resolve(["cipherText": (sealBox.combined?.base64EncodedString())! as String]);
    } catch {
      NSLog("Test Now \(error)");
      reject(error.localizedDescription, "ERROR_ENCRYPTING", error);
    }

  }


  @objc
  func decrypt(_ params: NSDictionary, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    guard let p = params as? [String: Any] else {
      reject("Invalid Params Object", "INVALID_PARAMS", nil);
      return;
    }

    let cipherText = p["cipherText"] as! String;
    let keyAlias = p["keyAlias"] as! String;

    do {
    
      let combined = Data(base64Encoded: cipherText)!;
      let sealBox = try AES.GCM.SealedBox(combined: combined);
      let key = try getKey(keyAlias);
      let decrypted = try AES.GCM.open(sealBox, using: key);
      resolve(["decrypted": String(decoding: decrypted, as: UTF8.self)])
    }
    catch {
      NSLog("test \(error)");
      reject(error.localizedDescription, "ERROR_DECRYPTING", error);
    }

  }

  @available(iOS 13.0, *)
  private func getKey(_ label: String) throws -> SymmetricKey {
    do {
      let store = GenericPasswordStore();
      guard let key: SymmetricKey = try store.readKey(account: label) else {
        //key does not exist. Create and store new key
        do {
          let key = SymmetricKey(size: .bits256);
          try store.storeKey(key, account: label);
          return key
        } catch {
          throw error;
        }
      }
      return key;
    } catch {
      throw error;
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }

}
