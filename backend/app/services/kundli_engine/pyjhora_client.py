import asyncio
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from jhora.horoscope.chart import charts, house
from jhora import utils

_executor = ThreadPoolExecutor(max_workers=4)

class PyJHoraClient:
    @staticmethod
    def _generate(date, time, lat, lon, tz):
        dob = datetime.strptime(date, "%Y-%m-%d")
        hour, minute = map(int, time.split(":"))

        jd = utils.julian_day(
            dob.year,
            dob.month,
            dob.day,
            hour + minute / 60,
            tz,
        )

        planets = charts.rasi_chart(jd, lat, lon)
        houses = house.get_houses(jd, lat, lon)

        return {"planets": planets, "houses": houses}

    @classmethod
    async def generate(cls, *args):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(_executor, cls._generate, *args)
