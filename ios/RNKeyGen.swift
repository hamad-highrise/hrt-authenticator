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
    let privateKeyTag = "\(keyAlias).private";
    let publicKeyTag = "\(keyAlias).public";
    
//    let privateKeyAttrs: [String: Any] = [
//      kSecAttrAccessible: kSecAttrAccessibleAfterFirstUnlock as String,
//      kSecAttrApplicationTag: privateKeyTag,
//      
//    ]
    

    let attributes: [String: Any] = [
      kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
      kSecAttrKeySizeInBits as String: 2048,
      kSecAttrCanSign as String: true,
      kSecAttrIsPermanent as String: true
     

    ]


  }

  @objc
  func signPayload(_ params: NSDictionary, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {

  }



  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }




}
