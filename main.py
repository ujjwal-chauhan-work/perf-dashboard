from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

def analyze_performance(file_path):
    df = pd.read_csv(file_path, index_col="Day")
    
    stats = pd.DataFrame({
        "Mean Performance": df.mean(),
        "Variance": df.var()
    })

    stats["Stability Score"] = stats["Mean Performance"] / np.sqrt(stats["Variance"] + 1)

    top_stable_performers = stats.sort_values(by="Stability Score", ascending=False).head(6)

    return top_stable_performers.reset_index().to_dict(orient="records")

@app.get("/api/performance")
def get_performance():
    file_path = "sample_performance_data.csv"
    return analyze_performance(file_path)
