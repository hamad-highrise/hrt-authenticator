//
//  KeyGenError.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 10/09/2021.
//

import Foundation


enum KeyGenError: Error {
  case keyNotFound
  case signature
  case keyGeneration
  case algorithmNotSupported
}
