////
////  UIDevice+JailBroken.swift
////  verify
////
////  Created by Jahanzaib Sarwar on 09/11/2021.
////
//
//import Foundation
//import UIKit
//
//extension UIDevice {
//  var isSimulator: Bool {
//    return TARGET_IPHONE_SIMULATOR != 0;
//  }
//}
//
//private struct JailBroken {
//
//  // check if cydia has installed
//  static func hasCydiaInstalled() -> Bool {
//    return UIApplication.shared.canOpenURL(URL(string: "cydia://")!);
//  }
//
//
//  // check if suspicious Apps path exists
//
//
//
//
//  // check if suspicious System paths to check
//
//
//
//  static var suspiciousAppsPathToCheck: [String]
//  return ["/Applications/Cydia.app",
//    "/Applications/blackra1n.app",
//    "/Applications/FakeCarrier.app",
//    "/Applications/Icy.app",
//    "/Applications/IntelliScreen.app",
//    "/Applications/MxTube.app",
//    "/Applications/RockApp.app",
//    "/Applications/SBSettings.app",
//    "/Applications/WinterBoard.app"
//  ]
//}
//
//static var suspiciousSystemPathsToCheck: [String] {
//  return ["/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
//    "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
//    "/private/var/lib/apt",
//    "/private/var/lib/apt/",
//    "/private/var/lib/cydia",
//    "/private/var/mobile/Library/SBSettings/Themes",
//    "/private/var/stash",
//    "/private/var/tmp/cydia.log",
//    "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
//    "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
//    "/usr/bin/sshd",
//    "/usr/libexec/sftp-server",
//    "/usr/sbin/sshd",
//    "/etc/apt",
//    "/bin/bash",
//    "/Library/MobileSubstrate/MobileSubstrate.dylib"
//  ]
//}
//}
