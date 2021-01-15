package com.verify.secure;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableEntryException;
import java.security.cert.CertificateException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.GCMParameterSpec;

public class DeCryptor {
    private final String ALGORITHM = "AES/GCM/NoPadding";
    private KeyManager keyManager;
    private Cipher cipher;

    DeCryptor() {
        this.keyManager = new KeyManager();

    }

    String decrypt(final String alias, final byte[] encryptedData, final byte[] iv) throws NoSuchPaddingException, NoSuchAlgorithmException,
            CertificateException, UnrecoverableEntryException, KeyStoreException, IOException, InvalidAlgorithmParameterException,
            InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        this.cipher = Cipher.getInstance(this.ALGORITHM);
        final GCMParameterSpec spec = new GCMParameterSpec(128, iv);
        this.cipher.init(Cipher.DECRYPT_MODE, keyManager.getSecretKey(alias), spec);
        return new String(cipher.doFinal(encryptedData), "UTF-8");
    }
}
