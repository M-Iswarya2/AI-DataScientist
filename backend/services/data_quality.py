import pandas as pd
from scipy.stats import mannwhitneyu, chi2_contingency

class DataQuality:
    def get_data_quality(self,data: pd.DataFrame):
        return {
            "missing_values": data.isnull().sum().to_dict(),
            "data_types": data.dtypes.astype(str).to_dict(),
            "duplicate_rows": int(data.duplicated().sum())}

class MissingValueAnalysis:
    def missing_value_analysis(self, data, missing_values, target, target_type):
        missing_value_anal = {}
        target_type = target_type['problem_type']
        print("TARGET:", target)
        print("TYPE :", target_type)
        if target_type == 'Regression':
            for feature, num in missing_values.items():
                if num>0:
                    group1 = data.loc[data[feature].isnull() & data[target].notnull(), target]
                    group2 = data.loc[data[feature].notnull() & data[target].notnull(), target]
                    u_test, p_test = self.mannwhit(group1, group2)
                    print(
                                feature,
                                "missing:", len(group1),
                                "not missing:", len(group2),
                                "U:", u_test,
                                "p:", p_test
                            )
                    if p_test >= 0.05:
                        relativity = False
                    else:
                        relativity = True
                    missing_value_anal[feature] = {'u_test' : u_test,
                                                'p_test' : p_test,
                                                  'significant' : relativity}
        if target_type == 'Classification':
            for feature, num in missing_values.items():
                if num>0:
                    missing_indicator = data[feature].isnull()
                    valid_data = data[data[target].notnull()]
                    chi_test, p_test = self.chi_square( missing_indicator[valid_data.index], valid_data[target])
                    if p_test >= 0.05:
                        relativity = False
                    else:
                        relativity = True
                    missing_value_anal[feature] = {'chi_test' : chi_test,
                                                'p_test' : p_test,
                                                    'significant' : relativity}
            
        return missing_value_anal

    def mannwhit(self,group_missing, group_not_missing):
        u_test, p_test = mannwhitneyu(group_missing, group_not_missing, alternative = 'two-sided')
        return u_test, p_test
    
    def chi_square(self,group_missing, group_not_missing):
        contingency_table = pd.crosstab(group_missing, group_not_missing)
        chi2_test, p_test, dof, expected = chi2_contingency(contingency_table)
        return chi2_test, p_test