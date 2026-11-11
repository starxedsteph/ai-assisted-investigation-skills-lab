# AI Investigation Skills Lab

Practice investigating with an AI agent: ask questions, check evidence, and
decide how to present your findings. Follow the guides yourself rather than
giving the whole lab to your agent.

## Get the skills ready

The investigation skills live in the separate
[AI Investigation Skills repository](https://github.com/starxedsteph/ai-assisted-investigation-skills).
Use an AI agent with local file access and the tools needed for analysis.

To set up automatic discovery, install the complete collection in a skills
location supported by your agent. For this lab, a project-level location makes
the skills available whenever you work in the lab workspace. For example,
Copilot CLI supports `.github/skills/` and Claude Code supports `.claude/skills/`;
personal locations are also available. Copy the contents of the source
repository's `skills/` directory, keeping each skill folder and its bundled
files together. The skills repository's
[install and load guide](https://github.com/starxedsteph/ai-assisted-investigation-skills#install-and-load)
covers supported locations and setup for different agents. Follow your agent's
own instructions if it needs an additional step to discover or reload skills.

Once installed, describe what you want to investigate in natural language and
let your agent choose the relevant skills. For example: “Help me investigate
possible engagement manipulation in this lab's data.” You can also name a
specific skill if you prefer. Give your agent the path to the lab data when
needed.

## Set up BigQuery

Before a lab that queries Google's BigQuery, tell your agent:

> Setup BigQuery. Use the bigquery-setup skill to walk me through getting ready
> to run queries for this lab.

The [BigQuery setup skill](https://github.com/starxedsteph/ai-assisted-investigation-skills/blob/main/skills/bigquery-setup/SKILL.md)
walks you through choosing or creating a Google Cloud project, finding its
project ID, installing and authenticating the Google Cloud CLI (`gcloud` and
`bq`), choosing the lab's public source tables, and agreeing on query limits.
It explains the billing-disabled sandbox and optional billing with spending
safeguards; it does not enable billing automatically.

Setup prepares access and saves settings locally; it does not run queries.
Afterward, use `bigquery-query` with your agent to prepare queries. Each
submission requires a dry-run estimate, a server-enforced scan limit, and your
approval. See the
[BigQuery access and safeguards guide](https://github.com/starxedsteph/ai-assisted-investigation-skills#bigquery-access-and-safeguards)
for details.

## Lab plan

1. **Work through the [guided StarScout investigation](exercises/starscout-guided-lab.md).**
   Investigate possible campaigns, explore the evidence, create a report,
   compare with the researchers' results, and evaluate your findings.

2. **Try the [October 2026 Stars Investigation](exercises/october-stars-investigation.md).**
   Pull star events with BigQuery (or request a CSV from the instructor), explore possible
   campaigns, evaluate your findings, and create a report.

3. **Explore the [Amazon Reviews Investigation](exercises/amazon-reviews-investigation.md).**
   Look for review campaigns, follow up on patterns across reviewers and
   products, compare with the published results, and create a report.

4. **Try the [PyPI Investigation](exercises/pypi-investigation.md).**
   Get about a month of publication metadata with BigQuery, then choose your
   own questions and investigation.
