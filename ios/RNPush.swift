//
//  RNPush.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 07/10/2021.
//

import Foundation
import UserNotifications


@objc(RNPush)

class RNPush: NSObject {
  private static let KEY_NAME = "push_token";
//
//  func `init`() -> RNPush {
//    NotificationCenter.default.addObserver(self, selector: #selector(onNotification), name: NSNotification.Name("com.hrt.verify.alfa"), object: nil)
//    return RNPush();
//  }


  @objc
  func getAPNsToken(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let token = UserDefaults.standard.string(forKey: RNPush.KEY_NAME)!;
    resolve(["pushToken": token]);
  }

//  @objc
//  func onNotification(_ notification:Notification) {
//    NSLog("Hello from onNotification");
//  }

  @objc
  static func requestPushAuthorization() {
    let delegate = UIApplication.shared.delegate as! AppDelegate;
    UNUserNotificationCenter.current().getNotificationSettings(completionHandler: { settings in
      switch(settings.authorizationStatus) {
      case .notDetermined:
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound], completionHandler: { granted, err in
            if granted {
              UNUserNotificationCenter.current().delegate = delegate as? UNUserNotificationCenterDelegate;
              DispatchQueue.main.async {
                UIApplication.shared.registerForRemoteNotifications();
              }
            }
          })
        break;
      case .denied:
        break;
      case .authorized:
        DispatchQueue.main.async {
          UIApplication.shared.registerForRemoteNotifications();
        }
      case .provisional:
        break;
      case .ephemeral:
        break;
      @unknown default:
        break;
      }
    })
  }


  @objc
  static func onDevicetoken(_ deviceToken: NSData) -> Void {
    let tokenParts = deviceToken.map { data in String(format: "%02.2hhx", data) }
    let token = tokenParts.joined();
    UserDefaults.standard.set(token, forKey: KEY_NAME);
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }

}
