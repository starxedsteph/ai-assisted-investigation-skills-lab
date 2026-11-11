# AI Investigation Skills Lab

Practice investigating with an AI agent: ask questions, check evidence, and
decide how to present your findings. Follow the guides yourself rather than
giving the whole lab to your agent.

## Get the skills ready

The investigation skills live in the separate
[AI Investigation Skills repository](https://github.com/starxedsteph/ai-assisted-investigation-skills).
Use an AI agent with local file access and the tools needed for analysis.

One way to get started is to clone that repository and start your agent from
its folder:

```bash
git clone https://github.com/starxedsteph/ai-assisted-investigation-skills.git
cd ai-assisted-investigation-skills
```

Tell your agent to read the relevant `skills/<skill-name>/SKILL.md` and follow
its instructions, and give it the path to this lab's data when needed. Simply
starting in the folder does not mean every agent automatically loads the skills.

For automatic discovery, you can instead install the complete collection in
your lab workspace or your agent's personal skills directory. For example,
Copilot CLI supports `.github/skills/` in a project and `~/.copilot/skills/`
for personal use; Claude Code supports `.claude/skills/` and `~/.claude/skills/`.
Copy the contents of the source `skills/` directory, keeping the skill folders
and their bundled files together. Copilot CLI can also use the checkout directly:
use `/skills add` to add its absolute `skills/` path, then `/skills reload`.
See the skills repository's
[install and load guide](https://github.com/starxedsteph/ai-assisted-investigation-skills#install-and-load)
for details and other supported options.

Once the skills are available, ask your agent to use one by name, such as
`investigation-engagement-farming`, and work through the lab together.

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
