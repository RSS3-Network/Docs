---
title: Get Activities by Accounts
---

## API Changes

POST `/notes` is replaced by GET `/decentralized/accounts`

Both endpoints serve the same purpose: to retrieve a list of activities Open Information for multiple accounts.

## Parameter Changes

### For Requests

| **v0.4**                                                                                                                                                                 | **v1.0**                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `address` (required, string): The wallet address to query.                                                                                                               | **Renamed.**                                                                            |
| `account` (required, string): the account to query.                                                                                                                      |
| `count_only` (boolean, optional): Returns only the count of records.                                                                                                     | **Removed.**                                                                            |
| Providing a count is no longer meaningful and practical (adding unnecessary calculation time) due to the large amount of Open Information available.                     |
| `hash` (string, optional): Searches for an activity by hash.                                                                                                             | **Replaced** by `/decentralized/tx/{id}` endpoint.                                      |
| `hash_list` (array of strings, optional): Filters by a list of activity hashes.                                                                                          | **Removed.**                                                                            |
| The ability to query multiple hashes simultaneously has been temporarily removed. We plan to introduce a new endpoint in the future that will handle batch hash queries. |
| `include_poap` (boolean, optional): Includes Proof of Attendance Protocols in the results.                                                                               | **Removed** as POAPs are included by default. You can filter them by using `direction`. |
| `limit` (number, optional): Limits the number of records returned.                                                                                                       | **Renamed.**                                                                            |
| `action_limit` (integer, optional): Limits the number of actions within an activity.                                                                                     |
| `page` (number, optional): Specifies pagination page.                                                                                                                    | **Removed.**                                                                            |
| Use `cursor` instead.                                                                                                                                                    |
| `query_status` (boolean, optional): Queries the status of activities.                                                                                                    | **Removed.**                                                                            |
| Use `success` instead.                                                                                                                                                   |
| `refresh` (boolean, optional): Forces a refresh of cached data.                                                                                                          | **Removed**.                                                                            |
| Refresh is no longer needed.                                                                                                                                             |
| `timestamp` (Time, optional): Filters activities from a specific timestamp.                                                                                              | **Replaced.**                                                                           |

Split into two paramters:

- `since_timestamp` (integer, optional): Retrieves activities starting from this timestamp.
- `until_timestamp` (integer, optional): Retrieves activities up until this timestamp. |
  | `token_id` (string, optional): Filters by specific token ID. | **Removed.**
  Due to low usage. |
  | | **New.**
  `success` (boolean, optional): Filters activities based on status. |
  | | **New.**
  `direction` (Direction, optional): Filters by the direction of activities. |

### For Responses

| **v0.4**                                                                                                                                                                                                                               | **v1.0**       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `address_status` (array of string): Contains the refresh status of each queried address, reflecting the current state of the cache for that address. This helps users understand the timeliness and reliability of the data presented. | **Removed**.   |
| No longer needed as the Node version does not use caching for address indexing, unlike the PreGod version.                                                                                                                             |
| `cursor` (string): A string used for pagination, indicating the position from which to continue fetching data in subsequent requests.                                                                                                  | **Replaced.**  |
| `meta` (MetaCursor): Contains metadata such as the pagination cursor for continuing the data fetch.                                                                                                                                    |
| `message` (string): A general message about the response, typically regarding the status of the request.                                                                                                                               | **Removed**.   |
| Due to low usage.                                                                                                                                                                                                                      |
| `total` (number, nullable): The total number of items that match the query, which may be absent if not applicable.                                                                                                                     | **Removed**.   |
| Providing a count is no longer meaningful and practical (adding unnecessary calculation time) due to the large amount of Open Information available.                                                                                   |
| `result` (array): An array of activities relevant to the queried address.                                                                                                                                                              | **Replaced.**  |
| `data` (array): Lists the activities associated with the account.                                                                                                                                                                      |
| `result.actions` (array): Details of actions involved in the activity.                                                                                                                                                                 | **Replaced.**  |
| `data.actions` (array): Upgraded protocol schema.                                                                                                                                                                                      |
| `result.address_from` (string): The originating address of the activity.                                                                                                                                                               | **Replaced.**  |
| `data.from` (string): The originating account of the activity.                                                                                                                                                                         |
| `result.address_to` (string): The destination address of the activity.                                                                                                                                                                 | **Replaced.**  |
| `data.to` (string): The destination account of the activity.                                                                                                                                                                           |
| `result.timestamp` (`Time`): Timestamps indicating the actual time of the activity.                                                                                                                                                    | **Replaced.**  |
| `data.timestamp` (integer): Changed from a potentially more complex `Time` object in the PreGod version to a simpler integer format in the Node version.                                                                               |
| `result.fee` (nullable): The activity fee, which may be null.                                                                                                                                                                          | **Replaced.**  |
| `data.fee` (Fee): Detailed fee information for the activity.                                                                                                                                                                           |
| `result.hash` (string): The hash of the activity.                                                                                                                                                                                      | **Replaced.**  |
| `data.id` (string): A unique identifier for the activity.                                                                                                                                                                              |
| `result.owner` (string): The owner of the address involved in the activity.                                                                                                                                                            | **No change.** |
| `data.owner` (string)                                                                                                                                                                                                                  |

| `result.network` (string): The open information network on which the activity occurred.

`result.platform` (string): The platform associated with the activity.

`result.tag` (string): A tag related to the activity.

`result.type` (string): The type of the activity. | **Schema upgraded**
`data.network` (Network)
\*\*\*\*`data.platform` (Platform)
`data.tag` (Tag)
`data.type` (string)

While these fields exist in both versions, in the Node API they are possibly enhanced with richer schema definitions or standardized formats to ensure consistency across different parts of the API. |
| `result.success` (boolean, nullable): Indicates whether the activity was successful. | **No change.**
`data.success` (boolean) |
| | **New.**
`data.calldata` (Calldata): Details of the call made during the activity. |
| | **New.**
`data.direction` (Direction): The direction of the activity. |
| | **New.**
`data.index` (integer): The index position of the activity in the list. |
| | **New.**
`data.total_actions` (integer): The total number of actions within the activity. |
