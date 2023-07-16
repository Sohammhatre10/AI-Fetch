import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
df = pd.read_csv("block_data.csv")
%matplotlib inline
plt.xlabel('timeStamp(seconds)')
plt.ylabel('blockReward(ether)')
plt.scatter(df.timeStamp,df.blockReward,color = 'blue',marker='.')
model = RandomForestRegressor(n_estimators=100,random_state=42)
model.fit(df.timeStamp.values.reshape(-1,1),df.blockReward.values.ravel())
new_timeStamp = np.array([[198297837]])
predicted_bR=model.predict(new_timeStamp)
print("Prediced block rewards:", predicted_bR[0])
