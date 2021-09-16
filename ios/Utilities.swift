//
//  Utilities.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 01/09/2021.
//

import Foundation
import UIKit

@objc(Utilities)

class Utilities: NSObject {
  
  
  private let keyName = "is_initiated";
 //to check if database has been created or not
  @objc
  func isInitiated(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void
  {
    let isInit = UserDefaults.standard.bool(forKey: keyName);
    resolve(["initiated": isInit]);
  }
  
  //for setting initiated flag
  @objc
  func setInitiated(_ resolve:RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    UserDefaults.standard.set(true, forKey: keyName);
    resolve(true);
  }
  
  
  @objc
  func getDeviceInfo(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    let device = UIDevice();
    let isFrontCameraAvaialable = UIImagePickerController.isCameraDeviceAvailable(UIImagePickerController.CameraDevice.front);
    let isRooted = isCydiaInstalled();
    
    
    resolve([
      "osVersion": device.systemVersion,
      "name": device.name,
      "model": device.model,
      "frontCamera": isFrontCameraAvaialable,
      "rooted": isRooted
    ])
    
  }
  
  @objc
  func getUUID(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    let uuid = UUID.init();
    resolve(["uuid": uuid.uuidString])
  }
  
  
  @objc
  func preventScreenshot() -> Void {
  
  }
  
  @objc
  func allowScreenshot() -> Void {
    
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
  private func isCydiaInstalled() -> Bool {
//    return UIApplication.shared.canOpenURL(URL(string: "cydia://")!);
    return false;
  }
}
