package com.verify.rncipher;

import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Log;
import android.util.Pair;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableEntryException;
import java.security.cert.CertificateException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;

public class RNCipher {

    private final String PROVIDER = "AndroidKeyStore";
    private final String TRANSFORMATION_ALGORITHM = "AES/CBC/NoPadding";
    private final String ALIAS = "RN_CIPHER_KEY_ALIAS";


    public Pair encrypt(final String keyAlias, String payload)
            throws CertificateException, NoSuchAlgorithmException, KeyStoreException,
            IOException, UnrecoverableEntryException, NoSuchProviderException,
            InvalidAlgorithmParameterException, NoSuchPaddingException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException {
        //
        final SecretKey secretKey;
        if (keysExist(ALIAS)) secretKey = getSecretKey(ALIAS);
        else secretKey = createKeys(ALIAS);
        final Cipher cipher = Cipher.getInstance(TRANSFORMATION_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        while (payload.getBytes().length % 16 != 0) {
            payload += '\u0020';
        }
        final byte[] encrypted = cipher.doFinal(payload.getBytes(StandardCharsets.UTF_8));
        final byte[] iv = cipher.getIV();
        Log.d("CIPHER", String.valueOf(new String(iv).getBytes().length));
        return new Pair(new String(encrypted, StandardCharsets.UTF_8), new String(iv, StandardCharsets.UTF_8));
    }

    public String decrypt(final String keyAlias, final String encryptedPayload, final String iv)
            throws NoSuchPaddingException, NoSuchAlgorithmException, CertificateException,
            UnrecoverableEntryException, KeyStoreException, IOException, InvalidKeyException,
            InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException {
        //
        Cipher cipher = Cipher.getInstance(TRANSFORMATION_ALGORITHM);
        SecretKey secretKey = getSecretKey(ALIAS);
        Log.d("CIPHER", String.valueOf(iv.getBytes(StandardCharsets.UTF_8).length));
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes(StandardCharsets.UTF_8));
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);
        final byte[] decrypted = cipher.doFinal(encryptedPayload.getBytes(StandardCharsets.UTF_8));
        return new String(decrypted, StandardCharsets.UTF_8);
    }


    private SecretKey createKeys(final String keyAlias)
            throws NoSuchProviderException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, PROVIDER);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            KeyGenParameterSpec spec = new KeyGenParameterSpec.Builder(ALIAS, KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                    .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
                    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                    .build();
            keyGenerator.init(spec);
            return keyGenerator.generateKey();
        }
        return null;
    }

    private SecretKey getSecretKey(final String keyAlias)
            throws KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException,
            UnrecoverableEntryException {
        KeyStore keyStore = KeyStore.getInstance(PROVIDER);
        keyStore.load(null);
        return ((KeyStore.SecretKeyEntry) keyStore.getEntry(ALIAS, null)).getSecretKey();
    }

    private Boolean keysExist(final String keyAlias) throws KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException {
        KeyStore keyStore = KeyStore.getInstance(PROVIDER);
        keyStore.load(null);
        return keyStore.containsAlias(ALIAS);
    }
}
