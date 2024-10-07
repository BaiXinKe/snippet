import hashlib
import hmac
import json

import secrets
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

def encropty_bob():
    hmac_sha256 = hmac.new(b'shared_key', digestmod=hashlib.sha256)
    message = b'from Bob to Alice'
    hmac_sha256.update(message)
    hash_value = hmac_sha256.hexdigest()

    authenticated_msg = {
        'message': list(message),
        'hash_value': hash_value
    }

    return json.dumps(authenticated_msg)

def authen_alice(inbound_msg_from_bob):
    authenticated_msg = json.loads(inbound_msg_from_bob)
    message = bytes(authenticated_msg['message'])

    hmac_sha256 = hmac.new(b'shared_key', digestmod=hashlib.sha256)
    hmac_sha256.update(message)
    hash_value = hmac_sha256.hexdigest()

    return hmac.compare_digest(hash_value, authenticated_msg['hash_value'])
        

def crypt_aes_with_ecb(): # never use in production
    key = b'key must be 128, 196 or 256 bits'

    cipher = Cipher(algorithms.AES(key), modes.ECD(),backend=default_backend)
    encryptor = cipher.encryptor()

    plain_text = b'block size = 128'
    encryptor.update(plain_text) + encryptor.finalize()


def crypt_aes_with_cbc(data):
    key = b'key 4must be 128, 196 or 256 bits'

    iv = secrets.token_bytes(16)
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend)
    encryptor = cipher.encryptor()
    
    return encryptor.update(data) + encryptor.finalize()


if __name__ == '__main__':
    # print(authen_alice(encropty_bob()))
    key = Fernet.generate_key()
    fernet = Fernet(key=key)
    token = fernet.encrypt(b'plaintext')
    print(token)