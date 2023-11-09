import pandas as pd
from sklearn.decomposition import PCA
import numpy as np

def condense_dataframe():
    # Step 1: Load the data
    # Replace 'path_to_dataset' with the actual path to the 'ratings.dat' file
    ratings = pd.read_csv('./ml-1m - 1/ml-1m/ratings.dat', sep='::', engine='python', 
                        names=['user_id', 'movie_id', 'rating', 'timestamp'])

    # Pivot the table to get a matrix of users and movie ratings
    user_movie_matrix = ratings.pivot_table(index='user_id', columns='movie_id', values='rating')

    # Number of movies per group
    movies_per_group = len(user_movie_matrix.columns) // 40

    # Dictionary to hold the condensed data
    condensed_data = {}

    # Condense the data
    for group in range(40):
        start_index = group * movies_per_group
        end_index = (group + 1) * movies_per_group if group < 39 else None  # handle the case where the number of movies isn't evenly divisible
        group_ratings = user_movie_matrix.iloc[:, start_index:end_index]
        
        # Compute the mean, but ignore NaN using `nanmean`
        condensed_data[f'group_{group+1}'] = np.nanmean(group_ratings, axis=1)

    # Create a new DataFrame from the condensed data
    condensed_df = pd.DataFrame(condensed_data, index=user_movie_matrix.index)

    # Replace NaN with 0s
    condensed_df.fillna(0, inplace=True)
    # print(condensed_df.head())

    condensed_df.to_csv('./condensed_data.csv')

if __name__ == '__main__':
    condense_dataframe()
