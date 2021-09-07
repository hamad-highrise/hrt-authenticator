//
//  GenericPasswordStore.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 06/09/2021.
//


/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Methods for storing generic password convertible items in the keychain.
*/

import Foundation
import CryptoKit
import Security

@available(iOS 13.0, *)
struct GenericPasswordStore {
    
    /// Stores a CryptoKit key in the keychain as a generic password.
    func storeKey<T: GenericPasswordConvertible>(_ key: T, label: String) throws {

        // Treat the key data as a generic password.
        let query = [kSecClass: kSecClassGenericPassword,
                     kSecAttrLabel: label,
                     kSecAttrAccessible: kSecAttrAccessibleAfterFirstUnlock,
                     kSecUseDataProtectionKeychain: true,
                     kSecValueData: key.rawRepresentation] as [String: Any]
        
        // Add the key data.
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeyStoreError("Unable to store item: \(status.message)")
        }
    }
    
    /// Reads a CryptoKit key from the keychain as a generic password.
    func readKey<T: GenericPasswordConvertible>(label: String) throws -> T? {

        // Seek a generic password with the given account.
        let query = [kSecClass: kSecClassGenericPassword,
                     kSecAttrLabel: label,
                     kSecUseDataProtectionKeychain: true,
                     kSecReturnData: true] as [String: Any]
        
        // Find and cast the result as data.
        var item: CFTypeRef?
        switch SecItemCopyMatching(query as CFDictionary, &item) {
        case errSecSuccess:
            guard let data = item as? Data else { return nil }
            return try T(rawRepresentation: data)  // Convert back to a key.
        case errSecItemNotFound: return nil
        case let status: throw KeyStoreError("Keychain read failed: \(status.message)")
        }
    }
    
    /// Stores a key in the keychain and then reads it back.
    func roundTrip<T: GenericPasswordConvertible>(_ key: T) throws -> T {
        
        // An account name for the key in the keychain.
        let label = "com.example.genericpassword.key"
        
        // Start fresh.
        try deleteKey(label: label)
        
        // Store and read it back.
        try storeKey(key, label: label)
        guard let key: T = try readKey(label: label) else {
            throw KeyStoreError("Failed to locate stored key.")
        }
        return key
    }
    
    /// Removes any existing key with the given account.
    func deleteKey(label: String) throws {
        let query = [kSecClass: kSecClassGenericPassword,
                     kSecUseDataProtectionKeychain: true,
                     kSecAttrLabel: label
        ] as [String: Any]
        switch SecItemDelete(query as CFDictionary) {
        case errSecItemNotFound, errSecSuccess: break // Okay to ignore
        case let status:
            throw KeyStoreError("Unexpected deletion error: \(status.message)")
        }
    }
}
