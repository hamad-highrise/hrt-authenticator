//
//  ExportManager.swift
//  verify
//
//  Created by Jahanzaib Sarwar on 15/09/2021.
//

class ExportManager: NSObject {
  //Export the RSA public key to outside iOS realm
  private let ASNHeaderLength = 15;
  private let ASNHeaderSequenceMark: UInt8 = 48 // 0x30
  // RSA OID header
  private let OIDHeader: [UInt8] = [0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00]
  private let OIDHeaderLength = 15
  private let ExtendedLengthMark: UInt8 = 128 // 0x80
  private let ASNHeaderBitsStringMark: UInt8 = 03 //0x03


  func exportPublicKeyToDER(_ rawPublicKeyBytes: Data, keyType: String, keySize: Int) -> Data {
    // first we create the space for the ASN.1 header and decide about its length
    let bitstringEncodingLength = bytesNeededForRepresentingInteger(rawPublicKeyBytes.count)

    // start building the ASN.1 header
    var headerBuffer = [UInt8](repeating: 0, count: ASNHeaderLength);
    headerBuffer[0] = ASNHeaderSequenceMark;

    // total size (OID + encoding + key size) + 2 (marks)
    let totalSize = OIDHeaderLength + bitstringEncodingLength + rawPublicKeyBytes.count + 3
    let totalSizebitstringEncodingLength = encodeASN1LengthParameter(totalSize, buffer: &(headerBuffer[1]))

    // bitstring header
    var keyLengthBytesEncoded = 0
    var bitstringBuffer = [UInt8](repeating: 0, count: ASNHeaderLength);
    bitstringBuffer[0] = ASNHeaderBitsStringMark
    keyLengthBytesEncoded = encodeASN1LengthParameter(rawPublicKeyBytes.count + 1, buffer: &(bitstringBuffer[1]))
    bitstringBuffer[keyLengthBytesEncoded + 1] = 0x00

    // build DER key.
    var derKey = Data(capacity: totalSize + totalSizebitstringEncodingLength)
    derKey.append(headerBuffer, count: totalSizebitstringEncodingLength + 1)
    derKey.append(OIDHeader, count: OIDHeaderLength) // Add OID header
    derKey.append(bitstringBuffer, count: keyLengthBytesEncoded + 2) // 0x03 + key bitstring length + 0x00
    derKey.append(rawPublicKeyBytes) // public key raw data.

    return derKey
  }



  private func encodeASN1LengthParameter(_ length: Int, buffer: UnsafeMutablePointer<UInt8>) -> Int {
    if length < Int(ExtendedLengthMark) {
      buffer[0] = UInt8(length)
      return 1 // just one byte was used, no need for length starting mark (0x80).
    } else {
      let extraBytes = bytesNeededForRepresentingInteger(length)
      var currentLengthValue = length

      buffer[0] = ExtendedLengthMark + UInt8(extraBytes)
      for i in 0 ..< extraBytes {
        buffer[extraBytes - i] = UInt8(currentLengthValue & 0xff)
        currentLengthValue = currentLengthValue >> 8
      }
      return extraBytes + 1 // 1 byte for the starting mark (0x80 + bytes used) + bytes used to encode length.
    }
  }




  private func bytesNeededForRepresentingInteger(_ number: Int) -> Int {
    if number <= 0 { return 0 }
    var i = 1
    while (i < 8 && number >= (1 << (i * 8))) { i += 1 }
    return i
  }
}
