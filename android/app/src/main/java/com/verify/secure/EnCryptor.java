package com.verify.secure;

import android.util.Pair;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

public class EnCryptor {
    private final String TRANSFORMATION = "AES/GCM/NoPadding";

    private KeyManager keyManager;
    private byte[] iv;
    private byte[] encrypted;


    EnCryptor() {
        this.keyManager = new KeyManager();
    }

    /**
     * Function returns a Pair with encrypted text and initialization vector as second vector
     *
     * @param alias     - Secret key alias
     * @param toEncrypt - Data to Encrypt
     * @return a Pair first element is Encrypted Text
     */

    Pair encrypt(final String alias, final String toEncrypt)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            NoSuchProviderException, InvalidAlgorithmParameterException,
            InvalidKeyException, UnsupportedEncodingException, BadPaddingException,
            IllegalBlockSizeException {
        final Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, keyManager.createSecretKey(alias));
        this.encrypted = cipher.doFinal(toEncrypt.getBytes("UTF-8"));
        this.iv = cipher.getIV();
        return new Pair(this.encrypted, this.iv);
    }

}
