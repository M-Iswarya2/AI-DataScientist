from services.type_detection import TypeDetection

td = TypeDetection()

class All_Types:
    def all_col_types(self, data):
        column_names = list(data.columns)
        col_types = {}
        for i in column_names:
            a = td.type_detection(data, i)
            col_types[i] = a
        return col_types

