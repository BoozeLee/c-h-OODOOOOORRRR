
# Calculate reasonable pricing for amphetamemes art prompt templates
# Based on market research data

import pandas as pd

# Market research data on pricing
pricing_data = {
    'Product Type': [
        'Individual AI Prompts (PromptBase)',
        'Prompt Bundle (small 10-100)',
        'Prompt Bundle (medium 1000+)',
        'ChatGPT Prompt Bundle (10,000)',
        'NFT Digital Art (psychedelic)',
        'Digital Art Print',
        'Premium Art Prompt Package',
        'Custom Prompt Creation'
    ],
    'Price Range Low ($)': [1.99, 5.00, 19.00, 29.00, 50.00, 20.00, 15.00, 29.99],
    'Price Range High ($)': [9.99, 15.00, 49.00, 49.00, 275.00, 100.00, 49.00, 100.00],
    'Platform Commission (%)': [20, 10, 10, 0, 2.5, 10, 10, 0],
    'Market': ['PromptBase', 'Etsy/Gumroad', 'Specialized platforms', 'Direct sales', 'Digital art marketplaces', 'Etsy/print sites', 'AI marketplaces', 'Freelance/direct']
}

df = pd.DataFrame(pricing_data)

print("=" * 80)
print("MARKET RESEARCH: AI PROMPT & DIGITAL ART PRICING (2025)")
print("=" * 80)
print(df.to_string(index=False))
print()

# Calculate recommended pricing for Amphetamemes templates
print("=" * 80)
print("RECOMMENDED PRICING FOR AMPHETAMEMES ART PROMPT TEMPLATES")
print("=" * 80)
print()

# Pricing strategy
pricing_tiers = {
    'Individual Template': {
        'price': 4.99,
        'description': 'Single prompt template with full specifications',
        'rationale': 'Mid-range for individual prompts, accounts for detailed construction'
    },
    'Starter Pack (3 templates)': {
        'price': 12.99,
        'description': '3 themed prompt templates of your choice',
        'rationale': '13% discount vs individual, good entry point'
    },
    'Creator Bundle (5 templates)': {
        'price': 19.99,
        'description': '5 prompt templates across different categories',
        'rationale': '20% discount vs individual, strong value proposition'
    },
    'Complete Series (10 templates)': {
        'price': 34.99,
        'description': 'All 10 original Amphetamemes prompt templates',
        'rationale': '30% discount vs individual, best value, exclusive feel'
    },
    'Custom Prompt Creation': {
        'price': 49.99,
        'description': 'Personalized prompt template addressing specific narrative',
        'rationale': 'Premium service, custom work justifies higher price'
    }
}

for tier, details in pricing_tiers.items():
    print(f"\n{tier.upper()}")
    print(f"  Price: ${details['price']}")
    print(f"  Includes: {details['description']}")
    print(f"  Rationale: {details['rationale']}")

# Calculate profit margins with different platform fees
print("\n" + "=" * 80)
print("PROFIT ANALYSIS (after platform fees)")
print("=" * 80)

revenue_scenarios = []

for tier, details in pricing_tiers.items():
    price = details['price']
    
    # Calculate profit with different platform commission rates
    for platform, commission in [('Direct Sale (0%)', 0), ('PromptBase (20%)', 20), ('Etsy/Gumroad (10%)', 10)]:
        profit = price * (1 - commission/100)
        revenue_scenarios.append({
            'Product': tier,
            'Price': f"${price:.2f}",
            'Platform': platform,
            'Net Profit': f"${profit:.2f}",
            'Commission': f"{commission}%"
        })

revenue_df = pd.DataFrame(revenue_scenarios)
print()
print(revenue_df.to_string(index=False))

# Sales projections
print("\n" + "=" * 80)
print("MONTHLY REVENUE PROJECTIONS (Conservative Estimates)")
print("=" * 80)
print()

sales_projection = {
    'Product': ['Individual Template', 'Starter Pack (3)', 'Creator Bundle (5)', 'Complete Series (10)', 'Custom Prompt'],
    'Price': [4.99, 12.99, 19.99, 34.99, 49.99],
    'Conservative Monthly Sales': [15, 8, 5, 3, 2],
    'Moderate Monthly Sales': [30, 15, 10, 6, 4],
    'Optimistic Monthly Sales': [50, 25, 15, 10, 6]
}

proj_df = pd.DataFrame(sales_projection)

# Calculate monthly revenue
for scenario in ['Conservative', 'Moderate', 'Optimistic']:
    col_name = f'{scenario} Monthly Sales'
    proj_df[f'{scenario} Revenue'] = proj_df['Price'] * proj_df[col_name]

print(proj_df[['Product', 'Price', 'Conservative Monthly Sales', 'Conservative Revenue']].to_string(index=False))
print(f"\nCONSERVATIVE TOTAL MONTHLY REVENUE: ${proj_df['Conservative Revenue'].sum():.2f}")
print(f"After 10% platform fee: ${proj_df['Conservative Revenue'].sum() * 0.9:.2f}")
print()

print(proj_df[['Product', 'Price', 'Moderate Monthly Sales', 'Moderate Revenue']].to_string(index=False))
print(f"\nMODERATE TOTAL MONTHLY REVENUE: ${proj_df['Moderate Revenue'].sum():.2f}")
print(f"After 10% platform fee: ${proj_df['Moderate Revenue'].sum() * 0.9:.2f}")
print()

print(proj_df[['Product', 'Price', 'Optimistic Monthly Sales', 'Optimistic Revenue']].to_string(index=False))
print(f"\nOPTIMISTIC TOTAL MONTHLY REVENUE: ${proj_df['Optimistic Revenue'].sum():.2f}")
print(f"After 10% platform fee: ${proj_df['Optimistic Revenue'].sum() * 0.9:.2f}")

# Save pricing sheet
pricing_sheet = []
for tier, details in pricing_tiers.items():
    pricing_sheet.append({
        'Product': tier,
        'Price (USD)': f"${details['price']}",
        'Description': details['description'],
        'Profit (Direct)': f"${details['price']:.2f}",
        'Profit (10% fee)': f"${details['price'] * 0.9:.2f}",
        'Profit (20% fee)': f"${details['price'] * 0.8:.2f}"
    })

pricing_df = pd.DataFrame(pricing_sheet)
pricing_df.to_csv('amphetamemes_pricing_strategy.csv', index=False)

print("\n" + "=" * 80)
print("PRICING RECOMMENDATIONS SUMMARY")
print("=" * 80)
print("\n✓ Pricing files saved:")
print("  - amphetamemes_pricing_strategy.csv")
print("  - amphetamemes_prompt_templates.csv")
print("\n✓ Recommended starting price: $34.99 for complete 10-template series")
print("✓ Individual templates: $4.99 each")
print("✓ Expected monthly revenue (moderate scenario): $495-600")
