//
//  GenericPasswordConvertible.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 09/09/2021.
//

import Foundation
import CryptoKit

/// The interface needed for SecKey conversion.
protocol GenericPasswordConvertible: CustomStringConvertible {
    /// Creates a key from a raw representation.
    init<D>(rawRepresentation data: D) throws where D: ContiguousBytes
    
    /// A raw representation of the key.
    var rawRepresentation: Data { get }
}

extension GenericPasswordConvertible {
    /// A string version of the key for visual inspection.
    /// IMPORTANT: Never log the actual key data.
    public var description: String {
        return self.rawRepresentation.withUnsafeBytes { bytes in
            return "Key representation contains \(bytes.count) bytes."
        }
    }
}

// Declare that the Curve25519 keys are generic passord convertible.
@available(iOS 13.0, *)
extension Curve25519.KeyAgreement.PrivateKey: GenericPasswordConvertible {}

@available(iOS 13.0, *)
extension Curve25519.Signing.PrivateKey: GenericPasswordConvertible {}


@available(iOS 13.0, *)
// Ensure that SymmetricKey is generic password convertible.
extension SymmetricKey: GenericPasswordConvertible {
    init<D>(rawRepresentation data: D) throws where D: ContiguousBytes {
        self.init(data: data)
    }
    
    var rawRepresentation: Data {
        return dataRepresentation  // Contiguous bytes repackaged as a Data instance.
    }
}


@available(iOS 13.0, *)
// Ensure that Secure Enclave keys are generic password convertible.
extension SecureEnclave.P256.KeyAgreement.PrivateKey: GenericPasswordConvertible {
    init<D>(rawRepresentation data: D) throws where D: ContiguousBytes {
        try self.init(dataRepresentation: data.dataRepresentation)
    }
    
    var rawRepresentation: Data {
        return dataRepresentation  // Contiguous bytes repackaged as a Data instance.
    }
}


@available(iOS 13.0, *)
extension SecureEnclave.P256.Signing.PrivateKey: GenericPasswordConvertible {
    init<D>(rawRepresentation data: D) throws where D: ContiguousBytes {
        try self.init(dataRepresentation: data.dataRepresentation)
    }
    
    var rawRepresentation: Data {
        return dataRepresentation  // Contiguous bytes repackaged as a Data instance.
    }
}

extension ContiguousBytes {
    /// A Data instance created safely from the contiguous bytes without making any copies.
    var dataRepresentation: Data {
        return self.withUnsafeBytes { bytes in
            let cfdata = CFDataCreateWithBytesNoCopy(nil, bytes.baseAddress?.assumingMemoryBound(to: UInt8.self), bytes.count, kCFAllocatorNull)
            return ((cfdata as NSData?) as Data?) ?? Data()
        }
    }
}

