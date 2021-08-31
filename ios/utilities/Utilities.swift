//
//  Utilities.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 31/08/2021.
//

import Foundation

@objc(Utilities)
class Utilities: NSObject {
  
  
  @objc
  func isInitiated(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
  
    let initiated = UserDefaults.standard.bool(forKey: "is_initiated")
    resolve([initiated]);
  }
  
  @objc
  func setInitiated(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    UserDefaults.standard.set(true, forKey: "is_initiated");
    resolve(true);
  }
  
}
