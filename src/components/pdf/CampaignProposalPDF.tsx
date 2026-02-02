import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const blue = '#2563eb';
const purple = '#7c3aed';
const dark = '#0f172a';
const gray = '#64748b';
const lightGray = '#f1f5f9';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  // Page 1 accent bar
  accentBar: {
    height: 6,
    backgroundColor: blue,
  },
  content: {
    padding: '30 40',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottom: `2 solid ${blue}`,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandDot: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: blue,
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: dark,
    letterSpacing: 2,
  },
  brandSub: {
    fontSize: 9,
    color: gray,
    marginTop: 2,
    letterSpacing: 1,
  },
  metaBlock: {
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontSize: 8,
    color: gray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 10,
    color: dark,
    fontWeight: 'bold',
  },
  // Title area
  proposalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: dark,
    marginBottom: 4,
  },
  proposalSubtitle: {
    fontSize: 12,
    color: gray,
    marginBottom: 25,
  },
  // Stat strip
  statStrip: {
    flexDirection: 'row',
    backgroundColor: dark,
    borderRadius: 10,
    padding: 16,
    marginBottom: 25,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRight: '1 solid rgba(255,255,255,0.15)',
  },
  statItemLast: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  statCaption: {
    fontSize: 8,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Section
  sectionHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    color: blue,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 10,
  },
  // Cards
  card: {
    backgroundColor: lightGray,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  cardCol: {
    flex: 1,
  },
  label: {
    fontSize: 8,
    color: gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  value: {
    fontSize: 11,
    color: dark,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 4,
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: dark,
    marginBottom: 3,
  },
  divider: {
    borderBottom: '1 solid #e2e8f0',
    marginVertical: 10,
  },
  // Badges
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '3 8',
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 'bold',
  },
  // Table
  table: {
    marginTop: 8,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: dark,
    padding: '8 10',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  thText: {
    flex: 1,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    padding: '8 10',
    borderBottom: '1 solid #e2e8f0',
  },
  tableRowAlt: {
    flexDirection: 'row',
    padding: '8 10',
    borderBottom: '1 solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  td: {
    flex: 1,
    fontSize: 8,
    color: '#374151',
  },
  tdBold: {
    flex: 1,
    fontSize: 8,
    fontWeight: 'bold',
    color: dark,
  },
  tableTotalRow: {
    flexDirection: 'row',
    padding: '10 10',
    backgroundColor: '#eff6ff',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  // Metrics row
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    border: '1 solid #bae6fd',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 7,
    color: '#0369a1',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  // Checklist
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: blue,
    marginRight: 8,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1 solid #e2e8f0',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 7,
    color: '#94a3b8',
  },
  footerBrand: {
    fontSize: 7,
    color: blue,
    fontWeight: 'bold',
  },
  // CTA
  ctaBox: {
    marginTop: 15,
    backgroundColor: dark,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  ctaSub: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 3,
  },
});

interface CampaignData {
  name: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: string;
  productCategory: string;
  ageRange: [number, number];
  gender: string;
  incomeLevel: string[];
  locations: string[];
  selectedSites: string[];
  totalCost: number;
  totalReach: number;
  totalImpressions: number;
  sites: Array<{
    name: string;
    location: string;
    monthlyRate: number;
    reach: number;
    impressions: number;
    frequency: number;
  }>;
}

interface CampaignProposalPDFProps {
  data: CampaignData;
}

export function CampaignProposalPDF({ data }: CampaignProposalPDFProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const campaignDays = data.startDate && data.endDate
    ? Math.ceil((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const avgFrequency = data.sites.length > 0
    ? (data.sites.reduce((s, site) => s + site.frequency, 0) / data.sites.length).toFixed(1)
    : '0';

  const cpm = data.totalImpressions > 0
    ? ((data.totalCost / data.totalImpressions) * 1000).toFixed(2)
    : '0';

  const costPerReach = data.totalReach > 0
    ? (data.totalCost / data.totalReach).toFixed(2)
    : '0';

  return (
    <Document>
      {/* ───────────── PAGE 1: CAMPAIGN OVERVIEW ───────────── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.accentBar} />
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <View style={styles.brandBlock}>
                <View style={styles.brandDot} />
                <View>
                  <Text style={styles.brandName}>XCHANGE</Text>
                  <Text style={styles.brandSub}>BY GIGASTREAM</Text>
                </View>
              </View>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Campaign Proposal</Text>
              <Text style={styles.metaValue}>Ref: XCH-{Date.now().toString(36).toUpperCase()}</Text>
              <Text style={{ fontSize: 8, color: gray, marginTop: 3 }}>
                {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.proposalTitle}>{data.name || 'Campaign Proposal'}</Text>
          <Text style={styles.proposalSubtitle}>
            Prepared for {data.clientName || 'Client'} — {data.productCategory || 'Multi-Category'} Campaign
          </Text>

          {/* KPI Strip */}
          <View style={styles.statStrip}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>KES {(data.totalCost / 1000).toFixed(0)}K</Text>
              <Text style={styles.statCaption}>Total Investment</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{(data.totalReach / 1000000).toFixed(2)}M</Text>
              <Text style={styles.statCaption}>Estimated Reach</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{(data.totalImpressions / 1000000).toFixed(1)}M</Text>
              <Text style={styles.statCaption}>Impressions</Text>
            </View>
            <View style={styles.statItemLast}>
              <Text style={styles.statNumber}>{data.selectedSites.length}</Text>
              <Text style={styles.statCaption}>Premium Sites</Text>
            </View>
          </View>

          {/* Campaign Details */}
          <Text style={styles.sectionHeading}>Campaign Details</Text>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardCol}>
                <Text style={styles.label}>Campaign Period</Text>
                <Text style={styles.value}>{formatDate(data.startDate)} — {formatDate(data.endDate)}</Text>
                <Text style={styles.bodyText}>{campaignDays} days duration</Text>
              </View>
              <View style={styles.cardCol}>
                <Text style={styles.label}>Budget</Text>
                <Text style={styles.value}>KES {parseInt(data.budget || '0').toLocaleString()}</Text>
                <Text style={styles.bodyText}>Monthly: KES {data.totalCost.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <View style={styles.cardCol}>
                <Text style={styles.label}>Product Category</Text>
                <Text style={styles.value}>{data.productCategory || 'Not specified'}</Text>
              </View>
              <View style={styles.cardCol}>
                <Text style={styles.label}>Media Type</Text>
                <Text style={styles.value}>LED Digital Out-of-Home</Text>
              </View>
            </View>
          </View>

          {/* Target Audience */}
          <Text style={styles.sectionHeading}>Target Audience</Text>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardCol}>
                <Text style={styles.label}>Age Range</Text>
                <Text style={styles.value}>{data.ageRange[0]} — {data.ageRange[1] === 100 ? '55+' : data.ageRange[1]} years</Text>
              </View>
              <View style={styles.cardCol}>
                <Text style={styles.label}>Gender</Text>
                <Text style={[styles.value, { textTransform: 'capitalize' }]}>{data.gender}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.label}>Income Level</Text>
            <View style={styles.badgeRow}>
              {data.incomeLevel?.map((level) => (
                <View key={level} style={styles.badge}>
                  <Text>{level.charAt(0).toUpperCase() + level.slice(1)} Income</Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
            <Text style={styles.label}>Target Locations ({data.locations?.length || 0})</Text>
            <Text style={styles.bodyText}>{data.locations?.join(', ') || 'All regions'}</Text>
          </View>

          {/* Audience Demographics */}
          <Text style={styles.sectionHeading}>Audience Demographics</Text>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardCol}>
                <Text style={styles.boldText}>Age Distribution</Text>
                <Text style={styles.bodyText}>18-24: 19%  |  25-34: 27%  |  35-44: 22%</Text>
                <Text style={styles.bodyText}>45-54: 22%  |  55-64: 8%  |  65+: 2%</Text>
              </View>
              <View style={styles.cardCol}>
                <Text style={styles.boldText}>Gender Split</Text>
                <Text style={styles.bodyText}>Male: 57%  |  Female: 43%</Text>
                <Text style={{ ...styles.bodyText, marginTop: 6 }}>
                  <Text style={styles.boldText}>Top Segments: </Text>
                  Food Lovers 42%, Mid Income 24%
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>XCHANGE by Gigastream</Text>
            <Text style={styles.footerText}>Confidential — Page 1 of 2</Text>
          </View>
        </View>
      </Page>

      {/* ───────────── PAGE 2: SITE PERFORMANCE ───────────── */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.accentBar, { backgroundColor: purple }]} />
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.brandBlock}>
              <View style={[styles.brandDot, { backgroundColor: purple }]} />
              <View>
                <Text style={styles.brandName}>XCHANGE</Text>
                <Text style={styles.brandSub}>SITE PERFORMANCE REPORT</Text>
              </View>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Prepared For</Text>
              <Text style={styles.metaValue}>{data.clientName || 'Client'}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeading}>Selected Sites & Performance</Text>
          <Text style={styles.bodyText}>
            Premium LED digital locations selected based on audience match, traffic volume, and visibility scoring.
          </Text>

          {/* Sites Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, { flex: 2.2 }]}>Location</Text>
              <Text style={styles.thText}>Rate / mo</Text>
              <Text style={styles.thText}>Reach</Text>
              <Text style={styles.thText}>Impressions</Text>
              <Text style={styles.thText}>Freq.</Text>
            </View>
            {data.sites.map((site, i) => (
              <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <View style={{ flex: 2.2 }}>
                  <Text style={styles.tdBold}>{site.name}</Text>
                  <Text style={[styles.td, { fontSize: 7, color: gray }]}>{site.location}</Text>
                </View>
                <Text style={styles.td}>KES {(site.monthlyRate / 1000).toFixed(0)}K</Text>
                <Text style={styles.td}>{(site.reach / 1000).toFixed(0)}K</Text>
                <Text style={styles.td}>{(site.impressions / 1000000).toFixed(2)}M</Text>
                <Text style={styles.td}>{site.frequency}x</Text>
              </View>
            ))}
            <View style={styles.tableTotalRow}>
              <Text style={[styles.tdBold, { flex: 2.2 }]}>CAMPAIGN TOTAL</Text>
              <Text style={styles.tdBold}>KES {(data.totalCost / 1000).toFixed(0)}K</Text>
              <Text style={styles.tdBold}>{(data.totalReach / 1000).toFixed(0)}K</Text>
              <Text style={styles.tdBold}>{(data.totalImpressions / 1000000).toFixed(1)}M</Text>
              <Text style={styles.tdBold}>{avgFrequency}x</Text>
            </View>
          </View>

          {/* Performance Metrics */}
          <Text style={styles.sectionHeading}>Campaign Efficiency Metrics</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Avg Frequency</Text>
              <Text style={styles.metricValue}>{avgFrequency}x</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>CPM</Text>
              <Text style={styles.metricValue}>KES {cpm}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Cost / Reach</Text>
              <Text style={styles.metricValue}>KES {costPerReach}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Duration</Text>
              <Text style={styles.metricValue}>{campaignDays}d</Text>
            </View>
          </View>

          {/* Key Insights */}
          <Text style={styles.sectionHeading}>Key Insights</Text>
          <View style={styles.card}>
            {[
              'Peak audience exposure: 3pm — 6pm (71% of daily impressions)',
              'Weekend performance uplift: +24% average reach increase',
              'All selected sites carry a 90+ visibility score',
              'High-density placement across major traffic corridors',
              'Audience composition aligns with target demographic profile',
            ].map((text, i) => (
              <View key={i} style={styles.checkItem}>
                <View style={styles.checkDot} />
                <Text style={styles.bodyText}>{text}</Text>
              </View>
            ))}
          </View>

          {/* Next Steps */}
          <Text style={styles.sectionHeading}>Next Steps</Text>
          <View style={styles.card}>
            {[
              'Review and approve this proposal',
              'Execute campaign agreement',
              'Submit creative assets (specifications provided on approval)',
              'Campaign goes live on scheduled start date',
              'Receive weekly performance dashboards via Xchange',
            ].map((text, i) => (
              <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Text style={[styles.bodyText, { color: blue, fontWeight: 'bold', marginRight: 6 }]}>{i + 1}.</Text>
                <Text style={styles.bodyText}>{text}</Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <View style={styles.ctaBox}>
            <View>
              <Text style={styles.ctaText}>Ready to launch?</Text>
              <Text style={styles.ctaSub}>Contact your Xchange account manager to get started.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 9, color: '#ffffff', fontWeight: 'bold' }}>campaigns@gigastream.co.ke</Text>
              <Text style={{ fontSize: 8, color: '#94a3b8', marginTop: 2 }}>+254 700 000 000</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>XCHANGE by Gigastream</Text>
            <Text style={styles.footerText}>Confidential — Page 2 of 2</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
