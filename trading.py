# initial_balance = 1000  # Initial balance
# interest_rate = 0.10   # 10% profit per week
# weeks = 100             # Number of weeks
# balance_list = [initial_balance]  # Initialize a list with the initial balance

# for week in range(1, weeks + 1):
#     # Calculate the profit for the week
#     weekly_profit = balance_list[-1] * interest_rate

#     # Add the profit to the balance and append it to the list
#     new_balance = balance_list[-1] + weekly_profit
#     balance_list.append(new_balance)

# # Print the list of balances for each week
# for week, balance in enumerate(balance_list[1:], start=1):
#     print(f"Week {week}: ${balance:.2f}")

import pandas as pd

initial_balance = 1000  # Initial balance
interest_rate = 0.10   # 10% profit per week
weeks = 100             # Number of weeks
balance_list = [initial_balance]  # Initialize a list with the initial balance

for week in range(1, weeks + 1):
    # Calculate the profit for the week
    weekly_profit = balance_list[-1] * interest_rate

    # Add the profit to the balance and append it to the list
    new_balance = balance_list[-1] + weekly_profit
    balance_list.append(new_balance)

# Create a DataFrame to store the data
data = {'Week': range(1, weeks + 1), 'Balance': balance_list[1:]}
df = pd.DataFrame(data)

# Save the DataFrame to an Excel file
df.to_excel('balance_data.xlsx', index=False)
