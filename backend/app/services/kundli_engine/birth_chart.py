def derive_summary(raw_chart: dict) -> dict:
    planets = raw_chart.get("planets", {})
    moon = planets.get("Moon", {})

    return {
        "moon_sign": moon.get("sign"),
        "lagna": raw_chart["houses"].get(1),
        "planet_count": len(planets),
    }
