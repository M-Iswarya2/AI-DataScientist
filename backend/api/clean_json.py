import math
import numpy as np


def clean_for_json(obj):
    if isinstance(obj, dict):
        return {key: clean_for_json(value) for key, value in obj.items()}

    if isinstance(obj, list):
        return [clean_for_json(value) for value in obj]

    if isinstance(obj, tuple):
        return [clean_for_json(value) for value in obj]

    if isinstance(obj, np.bool_):
        return bool(obj)

    if isinstance(obj, (np.integer,)):
        return int(obj)

    if isinstance(obj, (np.floating,)):
        value = float(obj)
        return value if math.isfinite(value) else None

    if isinstance(obj, float):
        return obj if math.isfinite(obj) else None

    return obj