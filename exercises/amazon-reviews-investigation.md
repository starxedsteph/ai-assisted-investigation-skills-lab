# Amazon Reviews Investigation

Investigate a sample of 10,000 Amazon reviews from
[Brett Hollenbeck's review dataset](https://github.com/bretthollenbeck/fake-reviews-data).
Use your own prompts to explore possible review campaigns.

Start a fresh investigation session with the same skills and reporting
preferences you used in the earlier exercises.

## 1. Look for campaigns

Ask your agent to investigate [the review CSV](../data/fake-reviews-data.csv) for
potential campaigns. Watch for it to use `safe-data-ingestion`,
`campaign-identification`, and `investigation-fake-reviews`.

## 2. Explore the results

Read the results and ask follow-up questions. For example:

Do reviews arrive in unusual bursts? Are similar reviews appearing on different
products? Do the same reviewers appear across multiple products? Can you find
other related reviewers or products based on those patterns? What might genuine
engagement look like here?

Follow the questions that interest you and ask the agent to explain its evidence.

## 3. Compare with the published results

Ask your agent:

```text
Compare our findings with the labels and classifications in Brett Hollenbeck's CSV:
https://bretthollenbeckcom.wordpress.com/wp-content/uploads/2026/03/public_reviews_dataset_cleaned.csv_.zip

Match the reviews in our sample by review_id. Where do our findings agree or differ?
```

Read the comparison and ask follow-up questions.

## 4. Create a report

Ask your agent to create a report of the findings and comparison. Check whether it follows your
saved reporting preferences. Read it yourself and ask for changes where needed.

## 5. Optional: explore a product category

[McAuley Lab's Amazon Reviews 2023](https://amazon-reviews-2023.github.io/#grouped-by-category)
offers reviews and product metadata grouped by category, such as beauty,
electronics, and books.

Choose a category and ask your agent to investigate a manageable sample.
Explore your own questions and compare the patterns with what you found in
the first dataset.
