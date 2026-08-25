import "server-only";

const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const LOOKBACK_DAYS = 30;

type RumGroup = {
  count: number;
  dimensions: { requestPath: string };
};

type GraphQlResponse = {
  data?: {
    viewer?: {
      accounts?: Array<{
        rumPageloadEventsAdaptiveGroups?: RumGroup[];
      }>;
    };
  };
};

async function queryPopularPaths(limit: number): Promise<RumGroup[]> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const siteTag = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN?.trim();

  if (!apiToken || !accountId || !siteTag) return [];

  const until = new Date();
  const since = new Date(until.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);

  const query = `
    query PopularPages($accountTag: String!, $siteTag: String!, $since: Time!, $until: Time!, $limit: Int!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          rumPageloadEventsAdaptiveGroups(
            limit: $limit
            filter: { siteTag: $siteTag, datetime_geq: $since, datetime_leq: $until }
            orderBy: [count_DESC]
          ) {
            count
            dimensions {
              requestPath
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          accountTag: accountId,
          siteTag,
          since: since.toISOString(),
          until: until.toISOString(),
          limit,
        },
      }),
    });

    if (!res.ok) return [];

    const json: GraphQlResponse = await res.json();
    return json.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
  } catch {
    return [];
  }
}

export async function getPopularArticleSlugs(limit = 5): Promise<string[]> {
  const pages = await queryPopularPaths(limit * 3);
  const slugs: string[] = [];

  for (const page of pages) {
    const match = page.dimensions?.requestPath?.match(/^\/articles\/([^/?]+)/);
    if (match && !slugs.includes(match[1])) {
      slugs.push(match[1]);
    }
    if (slugs.length >= limit) break;
  }

  return slugs;
}
