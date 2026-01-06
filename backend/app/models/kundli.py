from datetime import datetime
from bson import ObjectId

class KundliModel:
    def __init__(
        self,
        user_id: ObjectId,
        signature: str,
        birth_data: dict,
        raw_chart: dict,
        derived: dict,
    ):
        self.user_id = user_id
        self.signature = signature
        self.birth_data = birth_data
        self.raw_chart = raw_chart
        self.derived = derived
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return self.__dict__
