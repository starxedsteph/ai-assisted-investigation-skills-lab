# AI Investigation Skills Lab

Practice investigating with an AI agent: ask questions, check evidence, and
decide how to present your findings. Follow the guides yourself rather than
giving the whole lab to your agent.

## Workshop resources

- **[Live presentation slides](https://starxedsteph.github.io/ai-assisted-investigation-skills-lab/)**
- **[Resources & reference links](resources/README.md)**

## Set up investigation skills

These labs use the [AI Investigation Skills](https://github.com/starxedsteph/ai-assisted-investigation-skills).
For automatic discovery, install its `skills/` collection in a project-level
skills location for this lab workspace. See the skills repository's
[README](https://github.com/starxedsteph/ai-assisted-investigation-skills#install-and-load)
for supported locations and setup instructions.

## Set up BigQuery

For labs that use BigQuery, ask your agent to set it up with `bigquery-setup`.
The skill guides project and CLI setup, source selection, and query limits; it
does not run queries or enable billing. See the
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
