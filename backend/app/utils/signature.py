import hashlib

def birth_signature(data: dict) -> str:
    raw = f"{data['date']}{data['time']}{data['latitude']}{data['longitude']}{data['timezone']}"
    return hashlib.sha256(raw.encode()).hexdigest()

