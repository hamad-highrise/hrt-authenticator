package com.verify.rncipher;

import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import android.util.Pair;

import java.io.IOException;
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


    public Pair<String, String> encrypt(final String keyAlias, String payload)
            throws CertificateException, NoSuchAlgorithmException, KeyStoreException,
            IOException, UnrecoverableEntryException, NoSuchProviderException,
            InvalidAlgorithmParameterException, NoSuchPaddingException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException {
        //
        SecretKey secretKey;
        if (keysExist(keyAlias)) secretKey = getSecretKey(keyAlias);
        else secretKey = createKeys(keyAlias);
        final Cipher cipher = Cipher.getInstance(TRANSFORMATION_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        StringBuilder payloadBuilder = new StringBuilder(payload);
        while (payloadBuilder.toString().getBytes().length % 16 != 0) {
            payloadBuilder.append('\u0020');
        }
        payload = payloadBuilder.toString();
        byte[] encrypted = cipher.doFinal(payload.getBytes());
        byte[] iv = cipher.getIV();
        String encodedIV = Base64.encodeToString(iv, Base64.NO_WRAP);
        String encodedEncrypted = Base64.encodeToString(encrypted, Base64.NO_WRAP);
        return new Pair<>(encodedEncrypted, encodedIV);
    }

    public String decrypt(final String keyAlias, final String encryptedPayload, final String iv)
            throws NoSuchPaddingException, NoSuchAlgorithmException, CertificateException,
            UnrecoverableEntryException, KeyStoreException, IOException, InvalidKeyException,
            InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException {
        //
        Cipher cipher = Cipher.getInstance(TRANSFORMATION_ALGORITHM);
        SecretKey secretKey = getSecretKey(keyAlias);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(Base64.decode(iv, Base64.NO_WRAP));
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);
        final byte[] decrypted = cipher.doFinal(Base64.decode(encryptedPayload, Base64.NO_WRAP));
        return new String(decrypted);
    }


    private SecretKey createKeys(final String keyAlias)
            throws NoSuchProviderException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, PROVIDER);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            KeyGenParameterSpec spec = new KeyGenParameterSpec.Builder(keyAlias, KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
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
        return ((KeyStore.SecretKeyEntry) keyStore.getEntry(keyAlias, null)).getSecretKey();
    }

    private Boolean keysExist(final String keyAlias) throws KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException {
        KeyStore keyStore = KeyStore.getInstance(PROVIDER);
        keyStore.load(null);
        return keyStore.containsAlias(keyAlias);
    }
}
