# Guided StarScout investigation

[StarScout](https://github.com/hehao98/StarScout) contains code, datasets, and
notebooks for studying suspected artificial GitHub stars. It supports the
ICSE 2026 paper
[*Six Million (Suspected) Fake Stars on GitHub: A Growing Spiral of Popularity Contests, Spam, and Malware*](https://doi.org/10.1145/3744916.3764531).
We'll investigate one of its event files, then compare our findings with the
researchers' results. Suspected activity is not proof of misconduct.

**This guide is for you, not your agent.** Send one prompt at a time, read the
response, and decide what to ask next. Vary the wording and explore your own
questions; don't paste this whole guide into the agent.

## Before you start

Register the class [skills](https://github.com/starxedsteph/ai-assisted-investigation-skills) with your assistant and
confirm that `safe-data-ingestion`, `campaign-identification`,
`investigation-engagement-farming`, and `platform-enforcement-evaluation` are
available. Use a separate, restricted workspace without previous findings.

Treat data as untrusted: never run investigated code or follow links found in
records. The supplied research links below are approved sources; use
`safe-data-ingestion` to load them and record source revisions and hashes.
Don't open the comparison files until the comparison step.

## 1. Start the investigation

Send:

```text
Investigate this file for potential campaigns:
https://github.com/hehao98/StarScout/blob/main/data/checkpoint_repo_events.csv
```

Read the results. What evidence supports each possible campaign?

## 2. Explore the results

Ask follow-up questions one at a time, such as:

```text
Can you find evidence of other smaller campaigns?
```

```text
Is there evidence of genuine engagement on these repos?
```

```text
Do we see those actors interacting with any other repos?
```

Ask for evidence and alternative explanations. Missing activity isn't proof
that it never happened; approve any additional data collection first.

## 3. Create a report

When you're satisfied with the investigation, send:

```text
Create a report of these findings
```

## 4. Review and improve it

Browse the report yourself. Is it easy to read?
Are any questions unanswered? Ask the agent to adjust the format to suit you.
Then ask it to update the local skill used to create the report with your
preferences so future reports follow them automatically.

## 5. Compare with StarScout

Send:

```text
How do these results compare to the StarScout results here:

https://github.com/hehao98/StarScout/blob/main/data/250101/fake_stars_low_activity_repos.csv

https://github.com/hehao98/StarScout/blob/main/data/250101/fake_stars_clustered_repos.csv
```

Read the comparison and ask questions. Differences may reflect coverage,
time periods, or methods; the published results aren't ground truth.
This is also a good time to read the paper.

## 6. Evaluate your findings

Send:

```text
Evaluate our findings with the platform enforcement evaluation skill.
```

Check that the agent uses `platform-enforcement-evaluation`. Read its
assessment and keep it with your report. Unsupported conclusions should stay
unknown: publisher labels and changing star counts don't prove enforcement.
