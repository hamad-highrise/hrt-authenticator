//
//  RNSecure.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 02/09/2021.
//

import Foundation
import CryptoKit
import Security

@objc(RNSecure)

class RNSecure: NSObject {
  private let APP_TAG = "com.hrt.verify".data(using: .utf8)!;
  private let KEY_ID = "RN_SECURE_ENCRYPTION_KEY";
  
  @objc
  func encrypt(_ payload: String, keyAlias: String, resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    if #available(iOS 13.0, *) {
      
      do {
        let payloadData = payload.data(using: .utf8)!;
        let key = try getKey(keyAlias);
        let sealBox = try AES.GCM.seal(payloadData, using: key);
        resolve(["cipherText": sealBox.combined?.base64EncodedString()]);
      } catch {
        reject(error.localizedDescription, "ERROR_ENCRYPTION", error);
      }
    } else {
      reject("Unsupported Version","VERSION_UNSUPPORTED", nil);
    };
  }
  
  @objc
  func decrypt(_ cipherText: String, keyAlias: String, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock ) -> Void {
    if #available(iOS 13.0, *){
      do {
        let combined = Data(base64Encoded: cipherText)!;
        let sealBox = try AES.GCM.SealedBox(combined: combined);
        let key = try getKey(keyAlias);
        let decrypted = try AES.GCM.open(sealBox, using: key);
        NSLog("hello Converted to decrypted")
        resolve(["decrypted": String(decoding: decrypted, as: UTF8.self) ])
      }
      catch {
        NSLog("hello \(error) ");
        reject(error.localizedDescription, "ERROR_DECRYPTING", error);
      }
    }
  }
  

  @available(iOS 13.0, *)
  private func getKey(_ label: String) throws -> SymmetricKey {
    guard let key: SymmetricKey = try GenericPasswordStore().readKey(label: label) else {
      //creates a new key and returns
      let newKey = SymmetricKey(size: .bits256);
      try! GenericPasswordStore().storeKey(newKey, label: label)
      return newKey;
    }
    //returns if key exists
    return key;
  }
  
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
}
