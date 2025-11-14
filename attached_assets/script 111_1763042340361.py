
# Create a comprehensive amphetamemes art prompt template system
# Based on psychedelic, 2d comic book, chaotic, rebellious, truth-revealing aesthetics

import json
import csv

# Define the template structure for amphetamemes art prompts
amphetamemes_template = {
    "template_name": "Amphetamemes Art Prompt Generator",
    "version": "1.0",
    "aesthetic": "psychedelic 2d comic book chaotic mischievous rebellious criminally optimistic inverted fluid truth revealing",
    "core_elements": {
        "visual_style": [
            "2D comic book illustration",
            "psychedelic color palette (neon, vibrant, high contrast)",
            "underground comix aesthetic (R. Crumb, S. Clay Wilson, Gilbert Shelton inspired)",
            "chaotic composition with multiple focal points",
            "inverted color schemes and reality distortions",
            "fluid, melting, morphing forms",
            "hallucinatory patterns and fractals"
        ],
        "mood_keywords": [
            "mischievous",
            "rebellious", 
            "criminally optimistic",
            "truth-revealing",
            "anarchic",
            "satirical",
            "subversive",
            "mind-bending"
        ],
        "technical_specs": [
            "bold linework with ink-style definition",
            "Ben-Day dots and halftone patterns",
            "motion lines and speed effects",
            "overlapping imagery and collage elements",
            "warped text and psychedelic typography",
            "phosphenes, spirals, concentric circles"
        ]
    },
    "prompt_structure": {
        "format": "[SUBJECT] + [STYLE] + [MOOD] + [CONTEXT] + [TECHNICAL]",
        "example": "A distorted portrait of modern social anxiety, underground comix style, psychedelic colors, mischievous and truth-revealing, commenting on smartphone addiction, 2D comic book illustration with chaotic composition, neon palette, inverted reality, fluid forms, bold linework"
    }
}

# Create 10 specific prompt templates for the first series
prompt_templates = []

# Template 1: Social Media Satire
prompt_templates.append({
    "id": "AMP-001",
    "title": "Digital Dopamine Dealer",
    "category": "Social Media Critique",
    "full_prompt": "A smartphone with tentacles wrapped around a human brain, underground comix style, psychedelic neon colors (electric pink, acid green, cyber blue), 2D comic book illustration, mischievous and rebellious mood, satirizing social media addiction, chaotic composition with notification bubbles exploding like fireworks, Ben-Day dots pattern, inverted reality where the phone controls the human, fluid melting forms, bold black linework, truth-revealing commentary on November 2025 digital dependence",
    "current_narrative": "social media addiction and algorithm manipulation (2025)",
    "use_case": "social commentary art, editorial illustration, protest poster"
})

# Template 2: Climate Chaos
prompt_templates.append({
    "id": "AMP-002", 
    "title": "Burning Paradise Inversion",
    "category": "Climate Crisis",
    "full_prompt": "Earth as a melting ice cream cone held by corporate hands, underground comix psychedelic style, vibrant apocalyptic colors (toxic orange, radiation green, chemical purple), 2D comic book aesthetic, criminally optimistic yet truth-revealing, commenting on November 2025 climate crisis, chaotic swirling composition with dollar signs morphing into flames, inverted color scheme, fluid dripping reality, hallucinatory patterns, bold satirical linework, mischievous corporate mascots dancing in background",
    "current_narrative": "climate change denial vs reality (2025)",
    "use_case": "activist art, environmental campaign, gallery exhibition"
})

# Template 3: AI Anxiety
prompt_templates.append({
    "id": "AMP-003",
    "title": "Silicon Hallucination",
    "category": "AI & Technology",
    "full_prompt": "A human face merging with circuit boards and code, underground comix psychedelic art, electric neon palette (digital blue, algorithm pink, data green), 2D rebellious comic book style, mischievous and truth-revealing, addressing November 2025 AI anxiety and job displacement fears, chaotic fragmented composition, inverted human-machine relationship, fluid morphing between organic and digital, phosphenes and fractals, bold linework with glitch effects, criminally optimistic about technological dystopia",
    "current_narrative": "AI replacing human creativity and jobs (2025)",
    "use_case": "tech critique poster, digital art exhibition, editorial work"
})

# Template 4: Political Circus
prompt_templates.append({
    "id": "AMP-004",
    "title": "Democracy's Funhouse Mirror",
    "category": "Political Satire",
    "full_prompt": "Politicians as carnival barkers in a psychedelic circus tent, underground comix style, grotesque vibrant colors (garish red, corrupt gold, deception purple), 2D chaotic comic book illustration, rebellious and mischievous tone, satirizing November 2025 political theater and government shutdowns, warped funhouse mirror reality, inverted truth where lies become truth, fluid melting podiums and flags, Ben-Day dots, exaggerated caricature features, bold satirical linework, truth-revealing chaos",
    "current_narrative": "political dysfunction and polarization (2025)",
    "use_case": "political protest art, underground publication, gallery show"
})

# Template 5: Surveillance State
prompt_templates.append({
    "id": "AMP-005",
    "title": "All-Seeing Algorithm",
    "category": "Privacy & Surveillance",
    "full_prompt": "Giant eyeballs made of camera lenses watching people reduced to data points, underground comix psychedelic aesthetic, paranoid color palette (surveillance green, privacy-invasion blue, exposure red), 2D rebellious comic book style, mischievous yet truth-revealing, commenting on 2025 digital surveillance and privacy erosion, chaotic overlapping compositions of eyes and screens, inverted freedom where visibility equals control, fluid morphing between human and data, halftone patterns, bold conspiratorial linework",
    "current_narrative": "surveillance capitalism and privacy loss (2025)",
    "use_case": "privacy rights campaign, dystopian art series, editorial illustration"
})

# Template 6: Pharmaceutical Reality
prompt_templates.append({
    "id": "AMP-006",
    "title": "Prescription Paradise",
    "category": "Mental Health & Medication",
    "full_prompt": "Pill bottles transforming into surreal landscapes where people live, underground comix psychedelic style, pharmaceutical colors (antidepressant blue, anxiety orange, euphoria pink), 2D comic book illustration, criminally optimistic and rebellious, addressing 2025 mental health medication culture, chaotic composition with pills as building blocks, inverted wellness where medication creates new realities, fluid melting capsules and tablets, swirling patterns, bold satirical linework, truth-revealing about pharmaceutical dependence",
    "current_narrative": "mental health crisis and medication culture (2025)",
    "use_case": "mental health awareness art, pharmaceutical critique, gallery exhibition"
})

# Template 7: Consumer Apocalypse
prompt_templates.append({
    "id": "AMP-007",
    "title": "Shopping Cart Nirvana",
    "category": "Consumerism Critique",
    "full_prompt": "Humans morphing into shopping carts in a psychedelic mall wasteland, underground comix style, consumer colors (credit card gold, debt red, brand logo rainbow), 2D rebellious comic book aesthetic, mischievous and truth-revealing, satirizing 2025 consumerism and material worship, chaotic composition with products multiplying fractally, inverted freedom where consumption equals identity, fluid transformation between human and commodity, Ben-Day dots on packaging, bold anti-capitalist linework",
    "current_narrative": "consumer culture and materialistic obsession (2025)",
    "use_case": "anti-consumerism campaign, street art, gallery installation"
})

# Template 8: Crypto Chaos
prompt_templates.append({
    "id": "AMP-008",
    "title": "Blockchain Fever Dream",
    "category": "Cryptocurrency & Finance",
    "full_prompt": "Digital coins raining down while people drown in abstract financial data, underground comix psychedelic style, speculative colors (bitcoin gold, ethereum purple, crash red, boom green), 2D chaotic comic book illustration, criminally optimistic yet rebellious, commenting on 2025 crypto volatility and NFT market collapse, inverted wealth where virtual becomes more real than real, fluid morphing between money and meaninglessness, hallucinatory patterns of charts and graphs, bold satirical linework, truth-revealing about financial speculation",
    "current_narrative": "cryptocurrency volatility and NFT market decline (2025)",
    "use_case": "financial satire art, crypto critique poster, digital exhibition"
})

# Template 9: Education System Breakdown
prompt_templates.append({
    "id": "AMP-009",
    "title": "Standardized Test Nightmare",
    "category": "Education System",
    "full_prompt": "Students trapped in bubble sheets morphing into prison bars, underground comix psychedelic aesthetic, institutional colors (test pencil yellow, scantron gray, failure red, forced success blue), 2D rebellious comic book style, mischievous and truth-revealing, satirizing 2025 education system failures and student debt crisis, chaotic composition with textbooks exploding into meaningless symbols, inverted learning where memorization replaces understanding, fluid transformation of knowledge into burden, bold anti-establishment linework, swirling anxiety patterns",
    "current_narrative": "education system crisis and student debt (2025)",
    "use_case": "education reform art, student activism poster, social commentary"
})

# Template 10: Gig Economy Reality
prompt_templates.append({
    "id": "AMP-010",
    "title": "Uber to Nowhere",
    "category": "Labor & Economy",
    "full_prompt": "Workers juggling multiple phone apps while fragmenting into pieces, underground comix psychedelic style, hustle culture colors (burnout orange, side-gig green, exhaustion purple, false-promise gold), 2D chaotic comic book illustration, criminally optimistic yet rebellious, addressing 2025 gig economy precarity and worker exploitation, inverted freedom where flexibility equals insecurity, fluid bodies stretched across multiple jobs simultaneously, motion lines showing frantic energy, Ben-Day dots on app interfaces, bold labor-rights linework, truth-revealing about modern work conditions",
    "current_narrative": "gig economy exploitation and worker rights (2025)",
    "use_case": "labor rights campaign, worker solidarity art, editorial illustration"
})

# Save to CSV for easy reference
csv_data = []
for template in prompt_templates:
    csv_data.append({
        'ID': template['id'],
        'Title': template['title'],
        'Category': template['category'],
        'Full Prompt': template['full_prompt'],
        'Current Narrative (2025)': template['current_narrative'],
        'Use Case': template['use_case']
    })

# Write to CSV
with open('amphetamemes_prompt_templates.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['ID', 'Title', 'Category', 'Full Prompt', 'Current Narrative (2025)', 'Use Case'])
    writer.writeheader()
    writer.writerows(csv_data)

print("✓ Created 10 Amphetamemes Art Prompt Templates")
print("\nTemplate IDs:")
for t in prompt_templates:
    print(f"  {t['id']}: {t['title']} ({t['category']})")
