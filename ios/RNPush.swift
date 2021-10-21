//
//  RNPush.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 07/10/2021.
//

import Foundation
import UserNotifications
import Firebase


@objc(RNPush)

class RNPush: NSObject {
  private static let KEY_NAME = "push_token";


  @objc
  func getAPNsToken(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Messaging.messaging().token(completion: {token, error in
      if error != nil {
        reject("",error?.localizedDescription,error);
      } else if let token = token {
        
        resolve(["pushToken": token]);
      }
    })
  }



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
