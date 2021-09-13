//
//  BiometricsError.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 10/09/2021.
//

import Foundation

enum BiometricsError: Error {
  case keyNotFound
  case signature
  case keyGeneration
  case algorithmNotSupported
}
