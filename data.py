import pandas as pd

def analyze_performance(file_path):
    df = pd.read_csv(file_path, index_col="Day")
    
    stats = pd.DataFrame({
        "Mean Performance": df.mean(),
        "Variance": df.var()
    })
    
    stats["Stability Score"] = stats["Mean Performance"] / stats["Variance"]
    
    top_stable_performers = stats.sort_values(by="Stability Score", ascending=False).head(6)
    
    print("Top 6 Stable Performers Based on Stability Score:")
    print(top_stable_performers)

file_path = "sample_performance_data.csv"
analyze_performance(file_path)
