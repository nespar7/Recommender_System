import os
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from readData import condense_dataframe

#function to read condensed data
def read_condensed_dataframe():
    condensed_df = pd.read_csv('./condensed_data.csv', index_col='user_id')
    return condensed_df

#function to find 10 most similar data points
def find_similar_users(user_input, condensed_df):
    similarity_scores = cosine_similarity(user_input, condensed_df)
    similarity_scores = similarity_scores.flatten()
    top_100_indices = similarity_scores.argsort()[-10:][::-1]
    similarity_scores = similarity_scores[top_100_indices]
    top_100_similar_users = pd.DataFrame({'user_id': condensed_df.index[top_100_indices], 'similarity_score': similarity_scores})
    return top_100_similar_users



#function to fill in gaps in user input using collaborative filtering on similar users
def fill_in_gaps(user_input, condensed_df, top_100_similar_users):
    # Get the indices of the movies where user_input is 0
    indices_to_fill = np.where(user_input == 0)[1]
    # Get the user IDs of the top 100 similar users
    similar_user_ids = top_100_similar_users['user_id'].values
    
    columns_to_fill = ["group_"+str(i+1) for i in indices_to_fill]
    print(columns_to_fill)

    # Get the ratings of the top 100 similar users for the movies that the user hasn't seen
    similar_user_ratings = condensed_df.loc[similar_user_ids, columns_to_fill]
    # Compute the rating for each movie by taking the weighted average of the ratings of the top 100 similar users, weighted by the similarity score
    user_input = user_input.flatten()
    similar_user_ratings = similar_user_ratings.values
    similarity_scores = top_100_similar_users['similarity_score'].values
    weighted_ratings = np.matmul(similar_user_ratings.T, similarity_scores)
    weighted_ratings /= similarity_scores.sum()
    print(weighted_ratings)
    # Fill in the gaps in the user input with the computed ratings
    final_ratings = user_input.copy()
    final_ratings[indices_to_fill] = weighted_ratings
    return final_ratings.reshape(1, -1)


def model(user_input):
    # convert user_input to a 2D numpy array
    user_input = np.array(user_input).reshape(1, -1)
    # if condensed_data.csv doesn't exist, create it
    if not os.path.exists('./condensed_data.csv'):
        condense_dataframe()
    condensed_df = read_condensed_dataframe()
    # Step 5: Find the 100 most similar users and fill gaps in user_input with the ratings from the similar users
    top_100_similar_users = find_similar_users(user_input, condensed_df)
    final_ratings=fill_in_gaps(user_input, condensed_df, top_100_similar_users)
    
    return final_ratings