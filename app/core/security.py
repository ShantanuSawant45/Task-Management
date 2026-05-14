from passlib.context import CryptContext


def hash_password(password:str):
    pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
    hashed_pass=pwd_context.hash(password)
    
    return hashed_pass
    


def verify_password(plain_password:str,hashed_password:str):
    pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
    return pwd_context.verify(plain_password,hashed_password)   