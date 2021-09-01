//
//  Utilities.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 01/09/2021.
//

import Foundation

@objc(Utilities)

class Utilities: NSObject {
  
  
  private let keyName = "is_initiated";
 //to check if database has been created or not
  @objc
  func isInitiated(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void
  {
    let isInit = UserDefaults.standard.bool(forKey: keyName);
    resolve(["isInitiated": isInit]);
  }
  
  //for setting initiated flag
  @objc
  func setInitiated(_ resolve:RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    UserDefaults.standard.set(true, forKey: keyName);
    resolve(true);
  }
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
}
