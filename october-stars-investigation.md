# October 2026 Stars Investigation

Now lead your own investigation. Use October 2026 GitHub star events to look for
possible campaigns. Choose your own prompts and follow the evidence rather than
trying to find a predetermined answer.

Use the same skills and safety precautions as the [guided exercise](starscout-guided-lab.md),
including your locally updated reporting preferences, but start a fresh
investigation workspace and agent session.

## 1. Get the data in your AI chat

Ask your agent to use BigQuery to run the query below. BigQuery should already
be set up; if not, follow the setup instructions in
[ai-assisted-investigation-skills](https://github.com/starxedsteph/ai-assisted-investigation-skills)
before continuing.

The query selects October UTC star events for repositories with at least 50
events, including actors and timestamps for investigating timing and overlap.
This is a volume screen, not proof of a campaign.

Review the agent's dry-run scan estimate and maximum-bytes-billed cap, then
approve the exact query before execution.

```sql
WITH observed_stars AS (
  SELECT
    id AS event_id,
    repo.name AS repo_name,
    actor.login AS user_login,
    created_at AS starred_at
  FROM `githubarchive.month.202610`
  WHERE type = 'WatchEvent'
    AND created_at >= TIMESTAMP('2026-10-01 00:00:00+00')
    AND created_at < TIMESTAMP('2026-11-01 00:00:00+00')
),
candidates AS (
  SELECT repo_name
  FROM observed_stars
  GROUP BY repo_name
  HAVING COUNT(*) >= 50
)
SELECT event_id, repo_name, user_login, starred_at
FROM observed_stars
WHERE repo_name IN (SELECT repo_name FROM candidates)
ORDER BY starred_at, event_id;
```

**Can't get BigQuery working?** Ask the instructor for a CSV of the data.

## 2. Look for campaigns

Ask your agent to look for campaigns in the data.
Watch for it to use `safe-data-ingestion`, `campaign-identification`, and
`investigation-engagement-farming` without being told to. Read the results
and explore with your own follow-up questions.

## 3. Follow up with additional queries

Ask your agent to use BigQuery to answer questions raised by your results.
Was a particular campaign present in September? When did it start? What else
do the suspected fake-star accounts have in common beyond the patterns already
discovered? Can you find other related accounts based on that information?

## 4. Evaluate platform enforcement

Ask your agent to evaluate platform enforcement of the campaigns. Watch for it
to use `platform-enforcement-evaluation`.

## 5. Create a report

Ask the agent to report the findings and evaluation.
Check whether it automatically follows the reporting preferences you saved
during the guided exercise. Read the report yourself and make sure it includes
evidence, alternative explanations, and limitations.
