const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
menu.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(open));
  nav.classList.toggle('open',open);
});

const base='https://srpolyvinyl.com/srpolyvinyl/';

// Full 16 product groups with category badges and targeted related products
const products=[
  {name:'Artificial Grass',slug:'artificial-grass',tag:'Synthetic Turf',image:'product-grass.png',source:'artificial-grass.php',related:['pu-adhesive','eva','plasticizers','cpe']},
  {name:'EVA',slug:'eva',tag:'Copolymer Resin',image:'product-eva.png',source:'eva.php',related:['pu-resin-footwear','pu-adhesive','blowing-agent','plasticizers']},
  {name:'PU Resin (Footwear)',slug:'pu-resin-footwear',tag:'Footwear Systems',image:'product-footwear.png',source:'pu-resin-footware.php',related:['pu-adhesive','eva','plasticizers','chlorinated-paraffin-cpw']},
  {name:'PVC Resin Suspension',slug:'pvc-resin-suspension',tag:'Extrusion Grade',image:'product-resin-powder.png',source:'pvc-resin-suspension.php',related:['methyl-tin-stabilizer','cpe','processing-aid','plasticizers']},
  {name:'PVC Resin Paste',slug:'pvc-resin-paste',tag:'Plastisol Grade',image:'product-resin-powder.png',source:'pvc-resinp-paste.php',related:['plasticizers','additives-for-pvc-leather','blowing-agent','chlorinated-paraffin-cpw']},
  {name:'PVC Resin Copolymer',slug:'pvc-resin-copolymer',tag:'VC/VAc Copolymer',image:'product-resin-powder.png',source:'pvc-resin-copolymer.php',related:['pvc-resin-paste','plasticizers','de-aromatised-solvents','pu-adhesive']},
  {name:'Plasticizers (Primary & Secondary)',slug:'plasticizers',tag:'Plasticizers',image:'product-chemical-supply.png',source:'index.php',related:['pvc-resin-paste','chlorinated-paraffin-cpw','pvc-resin-suspension','additives-for-pvc-leather']},
  {name:'Release Paper',slug:'release-paper',tag:'Casting Lines',image:'product-release-paper.png',source:'casting-release-paper.php',related:['pvc-resin-paste','additives-for-pvc-leather','blowing-agent','pu-adhesive']},
  {name:'Blowing Agent (Azodicarbonamide)',slug:'blowing-agent',tag:'Foaming Agent',image:'product-blowing-agent.png',source:'blowing-agent.php',related:['pvc-resin-paste','additives-for-pvc-leather','eva','release-paper']},
  {name:'PU Adhesive',slug:'pu-adhesive',tag:'Bonding Systems',image:'product-adhesive.png',source:'pu-adhesive.php',related:['pu-resin-footwear','eva','de-aromatised-solvents','release-paper']},
  {name:'Processing Aid',slug:'processing-aid',tag:'Acrylic Modifier',image:'product-resin-powder.png',source:'index.php',related:['pvc-resin-suspension','cpe','methyl-tin-stabilizer','plasticizers']},
  {name:'CPE',slug:'cpe',tag:'Impact Modifier',image:'product-resin-powder.png',source:'index.php',related:['pvc-resin-suspension','processing-aid','methyl-tin-stabilizer','plasticizers']},
  {name:'Methyl Tin Stabilizer',slug:'methyl-tin-stabilizer',tag:'Heat Stabilizer',image:'product-chemical-supply.png',source:'methyl-tin-stabilizer.php',related:['pvc-resin-suspension','cpe','processing-aid','plasticizers']},
  {name:'De-aromatised Solvents',slug:'de-aromatised-solvents',tag:'Aliphatic Solvents',image:'product-chemical-supply.png',source:null,related:['additives-for-pvc-leather','pvc-resin-paste','pu-adhesive','plasticizers']},
  {name:'Additives for PVC Leather',slug:'additives-for-pvc-leather',tag:'Leather Chemicals',image:'product-additives.png',source:null,related:['pvc-resin-paste','release-paper','blowing-agent','de-aromatised-solvents']},
  {name:'Chlorinated Paraffin (CPW)',slug:'chlorinated-paraffin-cpw',tag:'Flame Retardant',image:'product-chemical-supply.png',source:null,related:['plasticizers','pvc-resin-paste','pvc-resin-suspension','additives-for-pvc-leather']}
].map((p,i)=>({...p,number:String(i+1).padStart(2,'0')}));

// Removed standalone products mapping for friendly contextual redirects
const removedProducts={
  'titanium-dioxide':{
    name:'Titanium Dioxide',
    reason:'Titanium Dioxide has been removed as a standalone product from our standard catalog. For specialty pigment or additive requirements, please submit a general enquiry to our technical sales team.',
    redirectSlug:'additives-for-pvc-leather',
    redirectName:'Additives for PVC Leather'
  },
  'acrylic-lacquer':{
    name:'Acrylic Lacquer',
    reason:'Acrylic Lacquer is now organized under our dedicated Surface Treatment Lacquers within the Additives for PVC Leather category.',
    redirectSlug:'additives-for-pvc-leather',
    redirectName:'Additives for PVC Leather (Surface Treatment Lacquers)'
  },
  'bonding-agent':{
    name:'Bonding Agent / PU Lacquer',
    reason:'Bonding Agent is now featured as a key subproduct within our dedicated Additives for PVC Leather range.',
    redirectSlug:'additives-for-pvc-leather',
    redirectName:'Additives for PVC Leather (Bonding Agent)'
  },
  'dispersing-agent':{
    name:'Dispersing Agent',
    reason:'Dispersing Agent is now featured as a specialized subproduct within our Additives for PVC Leather range.',
    redirectSlug:'additives-for-pvc-leather',
    redirectName:'Additives for PVC Leather (Dispersing Agent)'
  }
};

const main=document.querySelector('main');
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function productImage(p){
  return p.image
    ? `<img src="assets/${p.image}" alt="${escapeHtml(p.name)} — Industrial material illustration" loading="lazy">`
    : `<div class="placeholder"><b>${p.number}</b><span>Product image to be confirmed</span></div>`;
}

function card(p){
  return `<a class="product-card" href="#/products/${p.slug}">
    <div class="product-image">${productImage(p)}</div>
    <div class="card-body">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span class="card-number" style="margin-bottom:0;">MATERIAL / ${p.number}</span>
        ${p.tag?`<span style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--red);background:#fbebed;padding:2px 7px;border-radius:2px;">${escapeHtml(p.tag)}</span>`:''}
      </div>
      <h3>${escapeHtml(p.name)}</h3>
      <span class="text-link">View product details</span>
    </div>
  </a>`;
}

function cta(productName=''){
  const target=productName?`#/contact?product=${encodeURIComponent(productName)}`:'#/contact';
  return `<section class="cta">
    <div class="wrap">
      <h2>Let’s find the right chemical raw material<br>for your manufacturing process.</h2>
      <a class="button" href="${target}">Talk to our sales team</a>
    </div>
  </section>`;
}

function head(title,subtitle,parent,visual){
  return `<section class="page-head${visual?` page-head--${visual}`:''}">
    <div class="wrap">
      <div class="crumbs">
        <a href="#/">Home</a><span>/</span>
        ${parent?'<a href="#/products">Products</a><span>/</span>':''}
        <span>${escapeHtml(title)}</span>
      </div>
      <p class="eyebrow">S. R. POLYVINYL LIMITED</p>
      <h1>${escapeHtml(title)}</h1>
      ${subtitle?`<p class="lead">${subtitle}</p>`:''}
    </div>
  </section>`;
}

function referenceHome(){
  return `<section class="approved-hero">
    <img class="section-photo" src="assets/hero-warehouse.png" alt="Industrial raw material warehouse">
    <div class="hero-shade"></div><div class="red-diagonal" aria-hidden="true"></div>
    <div class="wrap hero-content">
      <p class="eyebrow light"><span></span>S. R. POLYVINYL LTD.</p>
      <h1>One Stop Solution<br>for <em>PVC Industry</em></h1>
      <p>A premier distributor and stockist of high-grade chemical raw materials essential for PVC processing, artificial leather, footwear and plastics manufacturing.</p>
      <div class="actions">
        <a class="button" href="#/products">Explore Products</a>
        <a class="dark-link" href="#/contact">Contact Us</a>
      </div>
    </div>
  </section>
  <section class="approved-about">
    <div class="about-photo"><img src="assets/about-resin.png" alt="Polymer resins and raw material stock" loading="lazy"></div>
    <div class="about-copy">
      <p class="eyebrow">ABOUT S. R. POLYVINYL</p>
      <h2>Your Trusted Partner in<br>PVC Raw Materials</h2>
      <p>Established in 2001, S. R. Polyvinyl Ltd. distributes and stocks a comprehensive portfolio of polymer resins, plasticizers, solvents and specialized additives across India.</p>
      <div class="strengths">
        <div><span>Competitive<br>Pricing</span></div>
        <div><span>Timely<br>Delivery</span></div>
        <div><span>Quality<br>Products</span></div>
      </div>
      <a class="text-link" href="#/about">Discover Our Company</a>
    </div>
  </section>
  <section class="approved-products">
    <img class="section-photo" src="assets/materials-studio.png" alt="Industrial polymer resins and additives portfolio" loading="lazy">
    <div class="product-shade"></div><div class="red-diagonal" aria-hidden="true"></div>
    <div class="product-intro wrap">
      <p class="eyebrow">OUR PRODUCTS</p>
      <h2>Materials That Power<br><em>Your Production</em></h2>
      <p>Explore our considered portfolio of 16 product groups engineered for consistent compounding and processing performance.</p>
    </div>
    <div class="product-actions actions">
      <a class="button" href="#/products">View All Products</a>
      <a class="dark-link" href="#/contact">Send an Enquiry</a>
    </div>
  </section>`;
}

function home(){
  return referenceHome()+`
  <section class="section wrap featured-materials">
    <div class="section-heading">
      <div>
        <p class="eyebrow">EXPLORE THE RANGE</p>
        <h2>One portfolio.<br>Many possibilities.</h2>
      </div>
      <div class="section-summary">
        <p>From PVC paste and suspension resins to de-aromatised solvents, plasticizers and artificial leather additives, source reliable materials for your production.</p>
        <a class="text-link" href="#/products">Explore all 16 product groups</a>
      </div>
    </div>
    <div class="cards">
      ${[
        products.find(p=>p.slug==='pvc-resin-paste'),
        products.find(p=>p.slug==='de-aromatised-solvents'),
        products.find(p=>p.slug==='additives-for-pvc-leather'),
        products.find(p=>p.slug==='chlorinated-paraffin-cpw')
      ].map(card).join('')}
    </div>
    <p class="source-note">Product illustrations for reference. Technical data sheets, packaging and availability are confirmed on enquiry.</p>
  </section>
  <section class="industries-section">
    <div class="wrap">
      <div class="section-heading">
        <div>
          <p class="eyebrow">INDUSTRIES WE SERVE</p>
          <h2>Materials behind<br>everyday possibilities.</h2>
        </div>
        <p class="section-summary">Serving manufacturers across artificial leather, pipes &amp; profiles, footwear, cables, and flexible coatings.</p>
      </div>
      <div class="industry-grid">
        <article class="industry-card">
          <img src="assets/product-release-paper.png" alt="Release paper and raw materials for artificial leather" loading="lazy">
          <div>
            <span>01 / ARTIFICIAL LEATHER</span>
            <h3>From base resin to surface finish.</h3>
            <p>Source PVC paste resin, plasticizers, release paper, azodicarbonamide blowing agents, and specialized leather additives in one unified supply chain.</p>
            <a class="dark-link" href="#/products/additives-for-pvc-leather">Explore leather additives</a>
          </div>
        </article>
        <article class="industry-card">
          <img src="assets/hero-warehouse.png" alt="PVC pipes and profiles manufacturing materials" loading="lazy">
          <div>
            <span>02 / PIPES &amp; PROFILES</span>
            <h3>Built around precision extrusion.</h3>
            <p>Discuss suspension-grade PVC resins (K-57, K-67), methyl tin stabilizers, CPE impact modifiers, and acrylic processing aids for rigid vinyl extrusion.</p>
            <a class="dark-link" href="#/products/pvc-resin-suspension">Explore PVC suspension resin</a>
          </div>
        </article>
        <article class="industry-card">
          <img src="assets/product-footwear.png" alt="Footwear raw materials and polymer resins" loading="lazy">
          <div>
            <span>03 / FOOTWEAR &amp; COMPOUNDING</span>
            <h3>Performance from sole to upper.</h3>
            <p>High-grade EVA resins, footwear PU resin systems, PU adhesives, and chlorinated paraffin (CPW) for durable footwear compounds.</p>
            <a class="dark-link" href="#/products/pu-resin-footwear">Explore footwear materials</a>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section class="sourcing-section section">
    <div class="wrap split">
      <div>
        <p class="eyebrow">SOURCING WORKFLOW</p>
        <h2>Your requirements.<br>Our next conversation.</h2>
        <p class="copy">Share your processing method, preferred grade and required batch volumes. Our New Delhi team provides prompt quotation, technical documentation, and supply schedule confirmation.</p>
        <a class="button" href="#/contact">Discuss your requirements</a>
      </div>
      <div class="sourcing-steps">
        <div>
          <span>01</span>
          <div>
            <h3>Tell us your application</h3>
            <p>Specify whether you require materials for spread coating, slush moulding, pipe extrusion, or compounding.</p>
          </div>
        </div>
        <div>
          <span>02</span>
          <div>
            <h3>Confirm specifications</h3>
            <p>Align on K-value, viscosity, flash point, plasticizer absorption, or additive formulation requirements.</p>
          </div>
        </div>
        <div>
          <span>03</span>
          <div>
            <h3>Schedule delivery</h3>
            <p>Confirm packaging (bags, drums, IBCs), commercial terms, and warehouse dispatch from New Delhi.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function catalogue(){
  return head('Explore our materials.','A considered portfolio of 16 product groups for PVC and polymer industries.',false,'materials')+`
  <section class="section wrap">
    <div class="catalogue-top">
      <span>All products</span>
      <span>16 product groups · Updated catalog</span>
    </div>
    <div class="cards">${products.map(card).join('')}</div>
    <p class="source-note">Illustrative imagery. Exact product specifications, packaging types, and batch quantities are confirmed upon formal commercial enquiry.</p>
  </section>`+cta();
}

function about(){
  return head('About S. R. Polyvinyl Ltd.','Reliable chemical distributor and raw material stockist based in New Delhi since 2001.')+`
  <section class="section wrap">
    <div class="split" style="align-items:center;">
      <div>
        <p class="eyebrow">ABOUT S. R. POLYVINYL LTD.</p>
        <h2>Our Story</h2>
        <p class="copy">Established in 2001 in New Delhi, India, <strong>S. R. Polyvinyl Ltd.</strong> has grown into a trusted distributor and stockist of chemical raw materials, specialty polymers, and industrial additives. Over more than two decades, we have built enduring supply partnerships by bridging industrial chemical producers with manufacturing units across North India and nationwide.</p>
        <p class="copy">We operate strictly as a dedicated stocking distributor, focusing on supply consistency, competitive commercial terms, and prompt fulfillment for critical production lines.</p>
        <div class="strengths" style="margin-top:24px;">
          <div><span>Competitive<br>Pricing</span></div>
          <div><span>Timely<br>Delivery</span></div>
          <div><span>Verified<br>Quality</span></div>
        </div>
      </div>
      <div>
        <div class="about-photo" style="border-radius:4px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <img src="assets/about-resin.png" alt="S. R. Polyvinyl chemical raw material supply and polymer stock" loading="lazy" style="width:100%;height:380px;object-fit:cover;">
        </div>
        <p class="source-note" style="margin-top:8px;">High-grade polymer resins and raw materials distributed from New Delhi.</p>
      </div>
    </div>
  </section>

  <section class="section wrap story" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <p class="eyebrow">PORTFOLIO &amp; EXPERTISE</p>
      <h2>Our Product Portfolio</h2>
      <p class="copy" style="max-width:850px;margin-bottom:28px;">Our 16-group catalog covers the complete spectrum of PVC compounding and processing inputs. We distribute PVC paste resins (dispersion grades) for plastisols, PVC suspension resins across standard K-values, copolymer resins, chlorinated paraffin (CPW), primary and secondary plasticizers, de-aromatised solvents (D-40 to D-130), azodicarbonamide blowing agents, methyl tin stabilizers, CPE, processing aids, release paper, and specialized additives for PVC leather.</p>
      
      <div class="industry-grid" style="margin-top:28px;">
        <article class="industry-card" style="background:#fff;border:1px solid var(--line);border-radius:4px;overflow:hidden;">
          <img src="assets/product-resin-powder.png" alt="PVC and polymer resins" loading="lazy" style="height:190px;">
          <div style="padding:22px;">
            <span style="color:var(--red);">01 / RESINS &amp; POLYMERS</span>
            <h3 style="color:var(--ink);font-size:20px;margin:10px 0;">PVC, EVA &amp; PU Resins</h3>
            <p style="color:var(--muted);font-size:14px;line-height:1.6;">Complete resin choices for rigid extrusion, flexible calendering, plastisol coating, and footwear molding.</p>
            <a class="text-link" href="#/products/pvc-resin-paste" style="margin-top:10px;">Explore Paste Resin</a>
          </div>
        </article>
        <article class="industry-card" style="background:#fff;border:1px solid var(--line);border-radius:4px;overflow:hidden;">
          <img src="assets/product-chemical-supply.png" alt="Plasticizers and dearomatised solvents" loading="lazy" style="height:190px;">
          <div style="padding:22px;">
            <span style="color:var(--red);">02 / PLASTICIZERS &amp; SOLVENTS</span>
            <h3 style="color:var(--ink);font-size:20px;margin:10px 0;">Plasticizers &amp; Dearom Solvents</h3>
            <p style="color:var(--muted);font-size:14px;line-height:1.6;">Primary plasticizers, CPW 52 secondary plasticizer, and clean, low-odor de-aromatised aliphatic solvents.</p>
            <a class="text-link" href="#/products/de-aromatised-solvents" style="margin-top:10px;">Explore Solvents</a>
          </div>
        </article>
        <article class="industry-card" style="background:#fff;border:1px solid var(--line);border-radius:4px;overflow:hidden;">
          <img src="assets/product-additives.png" alt="Functional additives for PVC leather" loading="lazy" style="height:190px;">
          <div style="padding:22px;">
            <span style="color:var(--red);">03 / FUNCTIONAL ADDITIVES</span>
            <h3 style="color:var(--ink);font-size:20px;margin:10px 0;">Leather Additives &amp; Aids</h3>
            <p style="color:var(--muted);font-size:14px;line-height:1.6;">Dispersing agents, bonding agents, surface treatment lacquers, stabilizers, and blowing agents.</p>
            <a class="text-link" href="#/products/additives-for-pvc-leather" style="margin-top:10px;">Explore Additives</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section wrap">
    <div class="section-heading">
      <div>
        <p class="eyebrow">MARKETS &amp; APPLICATIONS</p>
        <h2>Industries We Serve</h2>
      </div>
      <p class="section-summary">Our chemical materials portfolio powers demanding manufacturing lines across multiple industrial sectors.</p>
    </div>
    
    <div class="industry-grid">
      <article class="industry-card" style="background:#172530;border-radius:4px;overflow:hidden;">
        <img src="assets/product-release-paper.png" alt="Artificial Leather and synthetic leathercloth raw materials" loading="lazy" style="height:210px;">
        <div style="padding:24px;">
          <span style="color:#e36b75;">01 / ARTIFICIAL LEATHER</span>
          <h3 style="color:#fff;font-size:21px;margin:12px 0;">Rexine &amp; Coated Fabrics</h3>
          <p style="color:#c1cad2;font-size:14px;">PVC paste resin, casting release paper, blowing agents, plasticizers, and bonding additives.</p>
          <a class="dark-link" href="#/products/additives-for-pvc-leather" style="margin-top:12px;">View leather additives</a>
        </div>
      </article>

      <article class="industry-card" style="background:#172530;border-radius:4px;overflow:hidden;">
        <img src="assets/hero-warehouse.png" alt="Pipes, fittings and profiles raw materials" loading="lazy" style="height:210px;">
        <div style="padding:24px;">
          <span style="color:#e36b75;">02 / PIPES &amp; PROFILES</span>
          <h3 style="color:#fff;font-size:21px;margin:12px 0;">Extrusion &amp; Rigid Vinyl</h3>
          <p style="color:#c1cad2;font-size:14px;">PVC suspension resins (K-57, K-67), methyl tin stabilizers, CPE impact modifiers, and processing aids.</p>
          <a class="dark-link" href="#/products/pvc-resin-suspension" style="margin-top:12px;">View suspension PVC</a>
        </div>
      </article>

      <article class="industry-card" style="background:#172530;border-radius:4px;overflow:hidden;">
        <img src="assets/product-footwear.png" alt="Footwear soling and polymer materials" loading="lazy" style="height:210px;">
        <div style="padding:24px;">
          <span style="color:#e36b75;">03 / FOOTWEAR &amp; SOLING</span>
          <h3 style="color:#fff;font-size:21px;margin:12px 0;">Soles, Midsoles &amp; Uppers</h3>
          <p style="color:#c1cad2;font-size:14px;">EVA resins, PU footwear systems, PU adhesives, and compounding plasticizers for durable soling.</p>
          <a class="dark-link" href="#/products/pu-resin-footwear" style="margin-top:12px;">View footwear resins</a>
        </div>
      </article>
    </div>
  </section>

  <section class="section wrap story" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap split" style="align-items:center;">
      <div>
        <p class="eyebrow">CORE VALUES</p>
        <h2>Our Approach</h2>
        <p class="copy">We believe chemical distribution requires precision, transparent communication, and reliable fulfillment. Our team works closely with plant managers, technical formulators, and procurement heads to ensure required grades arrive on schedule with verified manufacturer documentation.</p>
        <div class="actions" style="margin-top:24px;">
          <a class="button" href="#/contact">Contact Our Delhi Office</a>
          <a class="button outline" href="#/products">Explore Product Range</a>
        </div>
      </div>
      <div>
        <div style="border-radius:4px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <img src="assets/materials-studio.png" alt="Quality raw materials stock and warehouse distribution" loading="lazy" style="width:100%;height:320px;object-fit:cover;">
        </div>
      </div>
    </div>
  </section>`+cta();
}

function pasteResin(){
  return head('PVC Paste Resin Supplier in Delhi','High-grade emulsion and micro-suspension PVC dispersion resins for plastisol coating, artificial leather, and molding.',true)+`
  <section class="section wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-image"><img src="assets/product-resin-powder.png" alt="PVC Paste Resin Powder illustration" loading="lazy"></div>
        <p class="source-note">Material illustration. Actual physical appearance is an ultra-fine, white, free-flowing powder.</p>
      </div>
      <div>
        <p class="eyebrow">PRODUCT OVERVIEW · PASTE RESIN</p>
        <h2>What is PVC Paste Resin?</h2>
        <p class="copy"><strong>PVC Paste Resin</strong> (also widely designated as <em>emulsion PVC</em> or <em>dispersion resin</em>) is a specialized grade of polyvinyl chloride polymer produced via emulsion or micro-suspension polymerization. Characterized by an ultrafine particle size distribution (typically 0.1 to 1.5 microns), it disperses rapidly into plasticizers (such as DOP, DOTP, or DINP) to formulate liquid PVC pastes, known as <strong>plastisols</strong> or <strong>organosols</strong>.</p>
        <p class="copy">Unlike standard rigid PVC, plastisols flow as liquids or viscous pastes at room temperature, allowing precision spread coating, dip molding, rotational casting, and slush molding before heat-induced gelation and fusion into durable flexible vinyl articles.</p>
        <div class="actions">
          <a class="button" href="#/contact?product=PVC%20Resin%20Paste">Request a Quote / Inquire</a>
          <a class="button outline" href="#/products">All Products</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f9fafb;padding-block:60px;">
    <div class="wrap">
      <p class="eyebrow">TECHNICAL COMPARISON</p>
      <h2>Difference Between PVC Paste Resin &amp; Suspension PVC</h2>
      <p class="copy" style="max-width:850px;margin-bottom:24px;">Understanding the structural and processing distinctions between paste resin and suspension PVC is critical for selecting the correct raw material for your manufacturing line:</p>
      <div class="spec-table-wrap">
        <table class="spec-table">
          <thead>
            <tr>
              <th>Property / Parameter</th>
              <th>PVC Paste Resin (Dispersion Grade)</th>
              <th>Suspension PVC Resin (Standard Grade)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Polymerization Method</strong></td>
              <td>Emulsion or Micro-suspension polymerization</td>
              <td>Suspension polymerization</td>
            </tr>
            <tr>
              <td><strong>Particle Size</strong></td>
              <td>Ultrafine (0.1 – 1.5 µm primary particles)</td>
              <td>Coarse, porous grains (100 – 150 µm)</td>
            </tr>
            <tr>
              <td><strong>Processing State</strong></td>
              <td>Liquid plastisol/organosol when mixed with plasticizer</td>
              <td>Dry powder blend / granulated compound</td>
            </tr>
            <tr>
              <td><strong>Rheological Behavior</strong></td>
              <td>Pseudoplastic, thixotropic, or dilatant flow curves</td>
              <td>High melt viscosity in extruder/injection barrel</td>
            </tr>
            <tr>
              <td><strong>Primary Processing Methods</strong></td>
              <td>Knife coating, screen printing, dipping, slush molding, casting</td>
              <td>Extrusion, injection molding, blow molding, calendering</td>
            </tr>
            <tr>
              <td><strong>Typical End Applications</strong></td>
              <td>Artificial leather (Rexine), tarpaulins, conveyor belts, vinyl flooring, dipped gloves, wallpaper</td>
              <td>Rigid &amp; flexible PVC pipes, window profiles, conduit, calendered sheets, cable insulation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section wrap">
    <p class="eyebrow">INDUSTRIAL USES</p>
    <h2>Verified Applications for PVC Paste Resin</h2>
    <div class="subproduct-grid">
      <div class="subproduct-item">
        <span class="subproduct-badge">COATING &amp; LAMINATION</span>
        <h3>Artificial Leather &amp; Synthetic Leathercloth</h3>
        <p>Essential for casting foam layers (with blowing agents) and compact top skin layers on release paper lines, delivering realistic leather grain, suppleness, and tear strength for automotive upholstery, footwear uppers, luggage, and furniture.</p>
      </div>
      <div class="subproduct-item">
        <span class="subproduct-badge">TARPAULINS &amp; TEXTILES</span>
        <h3>Coated Fabrics &amp; Tarpaulins</h3>
        <p>Spread coated onto high-tenacity polyester or nylon scrim to produce waterproof, weather-resistant truck tarpaulins, architectural membranes, inflatable boats, and industrial banners.</p>
      </div>
      <div class="subproduct-item">
        <span class="subproduct-badge">FLOORING &amp; WALLCOVERINGS</span>
        <h3>Vinyl Flooring &amp; Wallpaper</h3>
        <p>Formulated into clear wear-layers, printed intermediate coats, and cushioned foam backing layers for cushion vinyl flooring and textured scrubbable wallpapers.</p>
      </div>
      <div class="subproduct-item">
        <span class="subproduct-badge">DIPPING &amp; MOLDING</span>
        <h3>Dip Coating &amp; Slush Molding</h3>
        <p>Used in heated dip tanks for chemical-resistant industrial gloves, tool handles, protective caps, and slush molding for soft-touch automotive armrests and hollow rotational toys.</p>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="split">
      <div>
        <p class="eyebrow">PROCESSING GUIDELINES</p>
        <h2>Grade-Selection Considerations</h2>
        <p class="copy">Selecting the appropriate paste resin grade depends heavily on your processing line and rheological targets:</p>
        <ul style="color:var(--muted);font-size:14px;line-height:1.7;padding-left:20px;">
          <li><strong>K-Value (Molecular Weight):</strong> Higher K-values (K-72 to K-80) provide superior mechanical strength, tensile resilience, and abrasion resistance. Medium K-values (K-65 to K-70) provide lower paste viscosity and easier de-aeration.</li>
          <li><strong>Initial Paste Viscosity &amp; Viscosity Aging:</strong> Ensures consistent spreading under high-speed knife coaters without excessive viscosity build-up during batch storage.</li>
          <li><strong>Foaming &amp; Cell Structure:</strong> High-yield foaming grades are calibrated for uniform cell expansion when combined with Azodicarbonamide blowing agents in leather foam layers.</li>
          <li><strong>Air Release / De-aeration:</strong> Fast air release minimizes micro-voids and surface pinholes in transparent topcoats and dipped goods.</li>
        </ul>
      </div>
      <div>
        <p class="eyebrow">TECHNICAL DATA</p>
        <h2>Technical Specifications</h2>
        <div class="notice">
          <strong>Technical specifications available on request:</strong> Standard physical and chemical parameters vary by manufacturer and grade. Request a verified Technical Data Sheet (TDS) and Certificate of Analysis (CoA) from our technical sales desk.
        </div>
        <dl class="specs">
          <div><dt>Physical Form</dt><dd>Fine white powder</dd></div>
          <div><dt>Polymerization Process</dt><dd>Micro-suspension / Emulsion</dd></div>
          <div><dt>K-Value Range</dt><dd>K-65 to K-80 (Grade dependent)</dd></div>
          <div><dt>Brookfield Viscosity</dt><dd>Provided on official TDS per grade</dd></div>
          <div><dt>Volatile Matter</dt><dd>&le; 0.3% – 0.5% max</dd></div>
          <div><dt>Packaging</dt><dd>20 kg / 25 kg paper bags or jumbo bags</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section wrap">
    <p class="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
    <h2>Frequently Asked Questions About PVC Paste Resin</h2>
    <div class="faq-wrap">
      <details class="faq-card" open>
        <summary>What is the difference between PVC paste resin and PVC suspension resin?</summary>
        <div class="faq-content">
          <p>PVC paste resin has an ultrafine particle size (0.1–1.5 µm) that forms a liquid plastisol when mixed with plasticizers, processed via spread coating, dipping, or molding. Suspension PVC has larger grains (100–150 µm) and is dry-blended for rigid extrusion (pipes/profiles) or calendering.</p>
        </div>
      </details>
      <details class="faq-card">
        <summary>How is PVC paste resin used in artificial leather (Rexine) production?</summary>
        <div class="faq-content">
          <p>In artificial leather lines, paste resin is formulated into plastisols for the compact top skin coat and the foamed intermediate layer. Coated onto casting release paper, it is passed through heated ovens for gelling and expansion before lamination to a fabric backing.</p>
        </div>
      </details>
      <details class="faq-card">
        <summary>What plasticizers are compatible with PVC paste resin?</summary>
        <div class="faq-content">
          <p>Common compatible primary plasticizers include DOP, DOTP, DINP, and DOA, often blended with secondary plasticizers like Chlorinated Paraffin (CPW 52) and Epoxidized Soybean Oil (ESBO) to optimize viscosity, cost, and thermal stability.</p>
        </div>
      </details>
      <details class="faq-card">
        <summary>What K-value paste resin should I choose for my application?</summary>
        <div class="faq-content">
          <p>For high-strength applications like wear layers, tarpaulins, and conveyor belts, higher K-values (K72–K80) are preferred. For general artificial leather backing, rotational toys, and dipping, medium K-values (K65–K70) offer lower viscosity and easier processing.</p>
        </div>
      </details>
      <details class="faq-card">
        <summary>How can I obtain sample batches and technical data sheets?</summary>
        <div class="faq-content">
          <p>Contact our New Delhi sales office with your specific application, preferred brand/grade, and volume requirements. We provide verified technical data sheets, batch specifications, and commercial quotes.</p>
        </div>
      </details>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <div class="section-heading">
        <h2>Related PVC Raw Materials</h2>
        <a class="text-link" href="#/products">View full catalog</a>
      </div>
      <div class="cards">
        ${[
          products.find(p=>p.slug==='plasticizers'),
          products.find(p=>p.slug==='additives-for-pvc-leather'),
          products.find(p=>p.slug==='blowing-agent'),
          products.find(p=>p.slug==='chlorinated-paraffin-cpw')
        ].map(card).join('')}
      </div>
    </div>
  </section>`+cta('PVC Resin Paste');
}

function solventsPage(){
  const grades=[
    {code:'D-40',flash:'&ge; 40°C',boil:'150 – 200°C',evap:'Fast drying',desc:'Low flash point, fast-evaporating de-aromatised aliphatic hydrocarbon fluid. Ideal for fast-drying industrial coatings, spray degreasers, and surface cleaning thinners.'},
    {code:'D-60',flash:'&ge; 60°C',boil:'185 – 215°C',evap:'Moderate drying',desc:'Balanced evaporation rate and high solvency. Widely used in decorative paints, protective coatings, printing inks, and industrial cleaning formulations.'},
    {code:'D-80',flash:'&ge; 80°C',boil:'200 – 240°C',evap:'Medium-slow',desc:'Medium-high flash point offering enhanced workshop safety, low odour, and controlled dry time for printing inks, metalworking fluids, and industrial cleaners.'},
    {code:'D-100',flash:'&ge; 100°C',boil:'235 – 270°C',evap:'Slow drying',desc:'High flash point, very low volatile emission fluid. Suitable for metal rolling oils, aluminum foil processing, heavy-duty degreasers, and consumer aerosol products.'},
    {code:'D-110',flash:'&ge; 110°C',boil:'250 – 290°C',evap:'Slow / Low VOC',desc:'High flash point specialty solvent with narrow boiling cut. Used in premium industrial lubricants, pesticide carriers, and silicone sealant extenders.'},
    {code:'D-130',flash:'&ge; 130°C',boil:'275 – 315°C',evap:'Ultra-slow',desc:'Very high flash point and ultra-low volatility. Engineered for heavy industrial operations, specialized drilling fluids, and low-VOC manufacturing requirements.'}
  ];

  return head('De-aromatised Solvents (D-40 to D-130)','High-purity, deeply hydrogenated aliphatic hydrocarbon solvents with ultra-low aromatic content and low odour.',true)+`
  <section class="section wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-image"><img src="assets/product-chemical-supply.png" alt="De-aromatised Solvents supply" loading="lazy"></div>
        <p class="source-note">Aliphatic hydrocarbon fluid supplied in sealed industrial steel drums and IBCs.</p>
      </div>
      <div>
        <p class="eyebrow">PRODUCT OVERVIEW · ALIPHATIC FLUIDS</p>
        <h2>High-Purity De-aromatised Solvents</h2>
        <p class="copy"><strong>De-aromatised Solvents</strong> (designated by the "D" prefix followed by their minimum flash point in °C) are refined aliphatic hydrocarbon fluids manufactured via catalytic hydro-treating. This deep hydrogenation reduces aromatic and benzene content to trace levels (typically &lt; 0.5%), yielding exceptionally clean, virtually odourless solvents with narrow boiling ranges.</p>
        <p class="copy">They serve as safer, lower-toxicity, and environmentally responsible replacements for traditional mineral turpentine oils (MTO) and white spirits across paints, coatings, metal degreasing, printing inks, and polymer processing.</p>
        <div class="actions">
          <a class="button" href="#/contact?product=De-aromatised%20Solvents">Enquire About Solvents</a>
          <a class="button outline" href="#/products">All Products</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <p class="eyebrow">GRADE PORTFOLIO</p>
      <h2>Organized De-aromatised Solvent Grades</h2>
      <p class="copy" style="max-width:850px;margin-bottom:28px;">We supply a comprehensive spectrum of de-aromatised hydrocarbon grades categorized by flash point and boiling characteristics:</p>
      <div class="subproduct-grid">
        ${grades.map(g=>`
          <div class="subproduct-item">
            <span class="subproduct-badge">FLASH POINT: ${g.flash}</span>
            <h3>Grade ${escapeHtml(g.code)}</h3>
            <p>${escapeHtml(g.desc)}</p>
            <div class="subproduct-specs">
              <strong>Key Parameters:</strong>
              Boiling Range: ${g.boil}<br>
              Evaporation Profile: ${g.evap}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section wrap">
    <p class="eyebrow">TECHNICAL COMPARISON</p>
    <h2>Grade Comparison Table</h2>
    <div class="spec-table-wrap">
      <table class="spec-table">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Min. Flash Point (°C)</th>
            <th>Typical Boiling Range (°C)</th>
            <th>Aromatics Content</th>
            <th>Key Industrial Applications</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>D-40</strong></td>
            <td>&ge; 40</td>
            <td>150 – 200</td>
            <td>&lt; 0.5% wt</td>
            <td>Fast-drying paints, degreasing thinners, aerosol carrier</td>
          </tr>
          <tr>
            <td><strong>D-60</strong></td>
            <td>&ge; 60</td>
            <td>185 – 215</td>
            <td>&lt; 0.5% wt</td>
            <td>Architectural coatings, screen inks, general industrial cleaning</td>
          </tr>
          <tr>
            <td><strong>D-80</strong></td>
            <td>&ge; 80</td>
            <td>200 – 240</td>
            <td>&lt; 0.5% wt</td>
            <td>Offset printing inks, low-odour cleaners, metal rolling oils</td>
          </tr>
          <tr>
            <td><strong>D-100</strong></td>
            <td>&ge; 100</td>
            <td>235 – 270</td>
            <td>&lt; 0.5% wt</td>
            <td>Heavy-duty degreasing, aluminum rolling, sealants</td>
          </tr>
          <tr>
            <td><strong>D-110</strong></td>
            <td>&ge; 110</td>
            <td>250 – 290</td>
            <td>&lt; 0.5% wt</td>
            <td>Pesticide carrier fluids, specialty lubricants, silicone extenders</td>
          </tr>
          <tr>
            <td><strong>D-130</strong></td>
            <td>&ge; 130</td>
            <td>275 – 315</td>
            <td>&lt; 0.5% wt</td>
            <td>High-temperature industrial processing, low-VOC fluids</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="notice">
      <strong>Technical specifications available on request:</strong> Detailed Certificates of Analysis (CoA), density, distillation curves, and solvent viscosity data sheets are provided upon request for your specific batch.
    </div>
  </section>
  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <div class="section-heading">
        <h2>Related Raw Materials</h2>
        <a class="text-link" href="#/products">Full catalog</a>
      </div>
      <div class="cards">
        ${['additives-for-pvc-leather','pvc-resin-paste','pu-adhesive','plasticizers'].map(s=>products.find(x=>x.slug===s)).filter(Boolean).map(card).join('')}
      </div>
    </div>
  </section>`+cta('De-aromatised Solvents');
}

function pvcAdditivesPage(){
  const additives=[
    {name:'Dispersing Agent',badge:'RHEOLOGY & DISPERSION',desc:'Specialty surface-active dispersing agents engineered to ensure rapid, homogeneous pigment and mineral filler wetting in PVC plastisols. Prevents pigment agglomeration, minimizes viscosity rise over time, and delivers uniform coloration across artificial leather coatings.'},
    {name:'Surface Treatment Lacquers',badge:'SURFACE FINISH & PROTECTION',desc:'Formulated PU and acrylic surface lacquers designed for top-coat application on PVC and PU synthetic leather. Modifies surface gloss from high shine to ultra-matte, provides scratch, mar, and scuff resistance, and imparts a luxurious soft-touch leather feel.'},
    {name:'Bonding Agent',badge:'SUBSTRATE ADHESION',desc:'Cross-linking adhesion promoters and bonding primers that dramatically increase the peel and bond strength between PVC plastisol layers and textile backing fabrics (knitted, woven, or non-woven polyester/cotton), preventing delamination.'},
    {name:'PVC Paste Blending Resin',badge:'EXTENDER RESIN',desc:'Specialized suspension-grade blending resin (extender resin) with fine, non-porous particle morphology. Blended with PVC paste resin to reduce plastisol viscosity, suppress dilatant flow at high shear, and lower plasticizer demand and formulation costs.'},
    {name:'Adwil Lube-40',badge:'PROCESSING AID & LUBRICANT',desc:'High-performance specialty processing lubricant engineered for PVC leather manufacturing and calendering lines. Facilitates smooth metal release, prevents plate-out on embossing rollers, and enhances finished surface smoothness.'}
  ];

  return head('Additives for PVC Leather','Dedicated functional additives, dispersing agents, surface lacquers, bonding agents, blending resins, and lubricants.',true)+`
  <section class="section wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-image"><img src="assets/product-additives.png" alt="Additives for PVC Leathercloth production" loading="lazy"></div>
        <p class="source-note">Specialty formulation additives for artificial leather and coated fabric processing lines.</p>
      </div>
      <div>
        <p class="eyebrow">CATEGORY OVERVIEW · LEATHER CHEMICALS</p>
        <h2>Functional Additives for PVC Leather</h2>
        <p class="copy">Manufacturing high-quality artificial leather (Rexine), synthetic leathercloth, and coated fabrics requires precise chemical formulation beyond standard resin and plasticizer. <strong>S. R. Polyvinyl Ltd.</strong> supplies a complete category of functional additives engineered to optimize plastisol rheology, processing efficiency, fabric adhesion, and surface tactile aesthetics.</p>
        <p class="copy">Our range brings together verified dispersing agents, protective surface lacquers, fabric bonding agents, extender blending resins, and specialty processing lubricants.</p>
        <div class="actions">
          <a class="button" href="#/contact?product=Additives%20for%20PVC%20Leather">Enquire About Leather Additives</a>
          <a class="button outline" href="#/products">All Products</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <p class="eyebrow">DEDICATED PRODUCT RANGE</p>
      <h2>Additives Suite for Artificial Leather</h2>
      <p class="copy" style="max-width:850px;margin-bottom:28px;">Explore our five key functional additive subproducts tailored for synthetic leather casting, coating, and finishing lines:</p>
      <div class="subproduct-grid">
        ${additives.map(a=>`
          <div class="subproduct-item">
            <span class="subproduct-badge">${a.badge}</span>
            <h3>${escapeHtml(a.name)}</h3>
            <p>${escapeHtml(a.desc)}</p>
            <div class="subproduct-specs">
              <strong>Application Target:</strong>
              PVC &amp; PU synthetic leathercloth, automotive upholstery, footwear uppers, luggage fabrics.
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section wrap">
    <div class="split">
      <div>
        <p class="eyebrow">TECHNICAL INTEGRATION</p>
        <h2>Optimizing Your Leathercloth Formulation</h2>
        <p class="copy">In synthetic leather production, each additive performs an irreplaceable function:</p>
        <ul style="color:var(--muted);font-size:14px;line-height:1.7;padding-left:20px;">
          <li><strong>Dispersing Agents</strong> optimize paste viscosity and pigment stability during high-speed blending.</li>
          <li><strong>Paste Blending Resins</strong> lower formula costs while controlling high-shear dilatancy under coating blades.</li>
          <li><strong>Bonding Agents</strong> ensure the PVC base layer permanently bonds to polyester or knit fabrics without edge lifting.</li>
          <li><strong>Adwil Lube-40</strong> ensures clean release from heated drums and textured casting paper.</li>
          <li><strong>Surface Treatment Lacquers</strong> seal and protect the surface against chemical migration, stains, and scuff marks.</li>
        </ul>
      </div>
      <div>
        <p class="eyebrow">TECHNICAL ASSISTANCE</p>
        <h2>Technical Documentation &amp; Sampling</h2>
        <div class="notice">
          <strong>Technical specifications available on request:</strong> Share your line speed, oven temperatures, coating method, and target finish specifications to discuss suitable additive grades and dosage recommendations.
        </div>
        <dl class="specs">
          <div><dt>Supply Format</dt><dd>Liquids (drums/cans) and dry powders (bags)</dd></div>
          <div><dt>Compatibility</dt><dd>PVC paste plastisols, PU topcoats</dd></div>
          <div><dt>Storage Stability</dt><dd>Cool, dry, well-ventilated storage</dd></div>
          <div><dt>Commercial Quotes</dt><dd>Available on direct enquiry</dd></div>
        </dl>
      </div>
    </div>
  </section>
  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <div class="section-heading">
        <h2>Related Raw Materials</h2>
        <a class="text-link" href="#/products">Full catalog</a>
      </div>
      <div class="cards">
        ${['pvc-resin-paste','release-paper','blowing-agent','de-aromatised-solvents'].map(s=>products.find(x=>x.slug===s)).filter(Boolean).map(card).join('')}
      </div>
    </div>
  </section>`+cta('Additives for PVC Leather');
}

function cpwPage(){
  return head('Chlorinated Paraffin (CPW)','Cost-effective secondary plasticizer and flame retardant (CPW 52) for PVC compounding, cables, footwear, and rubber.',true)+`
  <section class="section wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-image"><img src="assets/product-chemical-supply.png" alt="Chlorinated Paraffin CPW supply" loading="lazy"></div>
        <p class="source-note">Supplied in standard 250 kg industrial HDPE/steel drums and bulk tanker loads.</p>
      </div>
      <div>
        <p class="eyebrow">PRODUCT OVERVIEW · SECONDARY PLASTICIZER</p>
        <h2>Chlorinated Paraffin (CPW)</h2>
        <p class="copy"><strong>Chlorinated Paraffin</strong> (commonly abbreviated as <strong>CPW</strong> or <strong>CP</strong>, with CPW 52 being the industry workhorse) is a chlorinated derivative of liquid paraffin wax. Characterized by high chlorine content (typically 50% to 54% in CPW 52), it serves as a highly effective <strong>secondary plasticizer</strong> and <strong>flame retardant additive</strong> in flexible PVC formulations.</p>
        <p class="copy">By partially replacing higher-cost primary plasticizers (such as DOP, DOTP, and DINP), CPW optimizes overall raw material costs while imparting enhanced flame resistance, dielectric insulation, and chemical stability to finished polymer products.</p>
        <div class="actions">
          <a class="button" href="#/contact?product=Chlorinated%20Paraffin%20(CPW)">Enquire About CPW</a>
          <a class="button outline" href="#/products">All Products</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <p class="eyebrow">FUNCTIONAL BENEFITS</p>
      <h2>Key Technical Roles in PVC Compounding</h2>
      <div class="values">
        <div class="value">
          <span>01 / COST OPTIMIZATION</span>
          <h3>Secondary Plasticization</h3>
          <p>Enables 15%–30% substitution of primary plasticizers in flexible compounds, lowering formulation expense without sacrificing elongation.</p>
        </div>
        <div class="value">
          <span>02 / SAFETY &amp; COMPLIANCE</span>
          <h3>Flame Retardancy</h3>
          <p>High chemically bound chlorine releases hydrogen chloride under combustion, acting as a natural gas-phase flame suppressor.</p>
        </div>
        <div class="value">
          <span>03 / ELECTRICAL PERFORMANCE</span>
          <h3>Dielectric Insulation</h3>
          <p>Excellent volume resistivity and water resistance make CPW indispensable in high-performance wire and cable insulation.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap">
    <p class="eyebrow">INDUSTRIAL APPLICATIONS</p>
    <h2>Verified Industrial Applications for CPW</h2>
    <div class="subproduct-grid">
      <div class="subproduct-item">
        <span class="subproduct-badge">ELECTRICAL INSULATION</span>
        <h3>Wire &amp; Cable Compounds</h3>
        <p>Extensively incorporated into PVC power cables, telecom wires, and FRLS (Flame Retardant Low Smoke) sheathing compounds for flame retardancy and dielectric integrity.</p>
      </div>
      <div class="subproduct-item">
        <span class="subproduct-badge">COATED FABRICS</span>
        <h3>Artificial Leather &amp; Rexine</h3>
        <p>Used as an auxiliary plasticizer in PVC leathercloth and flexible tarpaulin formulations to balance flexibility, hand-feel, and fire-resistant performance.</p>
      </div>
      <div class="subproduct-item">
        <span class="subproduct-badge">FOOTWEAR &amp; FLOORING</span>
        <h3>Footwear, Flooring &amp; Profiles</h3>
        <p>Added to PVC footwear soles, industrial matting, PVC garden hoses, and flexible extruded profiles for improved plasticizer solvency and cost balance.</p>
      </div>
      <div class="subproduct-item">
        <span class="subproduct-badge">METALWORKING &amp; RUBBER</span>
        <h3>Extreme Pressure Fluids &amp; Rubber</h3>
        <p>Functions as an extreme-pressure (EP) additive in metalworking cutting oils and as a softening/flame-retarding agent in conveyor belt rubber compounds.</p>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f9fafb;padding-block:60px;">
    <div class="split">
      <div>
        <p class="eyebrow">COMPOUNDING CONSIDERATIONS</p>
        <h2>Formulation &amp; Compatibility Notes</h2>
        <p class="copy">Because Chlorinated Paraffin is a secondary plasticizer, it must be balanced properly in formulation:</p>
        <ul style="color:var(--muted);font-size:14px;line-height:1.7;padding-left:20px;">
          <li><strong>Compatibility Limits:</strong> Maintain ratio within recommended limits (typically up to 15–25 PHR depending on base plasticizer) to prevent plasticizer migration or surface exudation ("sweating").</li>
          <li><strong>Thermal Stabilization:</strong> Combine with adequate secondary heat stabilizers (such as Epoxidized Soybean Oil - ESBO) and metallic stabilizers to ensure thermal processing stability.</li>
        </ul>
      </div>
      <div>
        <p class="eyebrow">SPECIFICATIONS</p>
        <h2>Technical Properties (CPW 52 Typical)</h2>
        <div class="notice">
          <strong>Technical specifications available on request:</strong> TDS, CoA, and specific gravity certificates are available for every supplied batch.
        </div>
        <dl class="specs">
          <div><dt>Chlorine Content</dt><dd>50% – 54% (Typical CPW 52)</dd></div>
          <div><dt>Specific Gravity @ 27°C</dt><dd>1.25 – 1.30</dd></div>
          <div><dt>Viscosity @ 27°C</dt><dd>15 – 30 Poise (grade specific)</dd></div>
          <div><dt>Color</dt><dd>Water-white to pale yellow liquid</dd></div>
          <div><dt>Volatile Loss (180°C/4hr)</dt><dd>&le; 1.0% max</dd></div>
        </dl>
      </div>
    </div>
  </section>
  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <div class="section-heading">
        <h2>Related Raw Materials</h2>
        <a class="text-link" href="#/products">Full catalog</a>
      </div>
      <div class="cards">
        ${['plasticizers','pvc-resin-paste','pvc-resin-suspension','additives-for-pvc-leather'].map(s=>products.find(x=>x.slug===s)).filter(Boolean).map(card).join('')}
      </div>
    </div>
  </section>`+cta('Chlorinated Paraffin (CPW)');
}

function genericDetail(p){
  const productCopy={
    'artificial-grass':{
      subtitle:'Synthetic turf materials and grass solutions for landscape, sports, and commercial applications.',
      overview:'We supply synthetic turf raw materials and grass solutions tailored for commercial landscaping, rooftop leisure, sports grounds, and interior decor. Engineered with UV-stabilized polymer yarns and resilient multi-layer backing for longevity under intense outdoor exposure.',
      applications:['Commercial and residential landscaping','Sports surfaces and putting greens','Rooftops, balconies, and leisure areas','Exhibition and retail displays']
    },
    'eva':{
      subtitle:'Ethylene Vinyl Acetate copolymer resins for footwear soling, foam sheets, and compounding.',
      overview:'Ethylene Vinyl Acetate (EVA) resins offer outstanding low-temperature flexibility, impact absorption, and chemical resistance. Widely utilized in crosslinked foam molding for footwear midsoles, sports equipment padding, hot-melt adhesives, and specialized injection compounding.',
      applications:['Footwear midsoles, flip-flops, and sports soles','Cross-linked EVA foam sheets and mats','Hot melt adhesives and sealants','Flexible injection-molded components']
    },
    'pu-resin-footwear':{
      subtitle:'Polyurethane resin systems for footwear soling, microcellular foam, and outsoles.',
      overview:'Polyurethane (PU) resin systems designed for cast and direct-injection footwear soling. Delivers lightweight microcellular structure, superior abrasion resistance, high flexural fatigue life, and comfortable cushioning for safety shoes, casual footwear, and sports soles.',
      applications:['Safety and industrial work boots','Casual and fashion footwear outsoles','Direct injection sole molding','Microcellular cushion insoles']
    },
    'pvc-resin-suspension':{
      subtitle:'Suspension-grade PVC homopolymers across K-57, K-67, and K-70 for rigid and flexible processing.',
      overview:'PVC Suspension Resin is the primary building block for rigid and flexible vinyl processing. Supplied across standard K-value grades (such as K-57 for injection molding/calendering, K-67 for pressure pipes and profiles, and K-70 for cable insulation and flexible tubing).',
      applications:['PVC pressure pipes, conduit, and drainage fittings','Window and architectural profiles','Calendered rigid and flexible vinyl films','Wire and cable insulation compounds']
    },
    'pvc-resin-copolymer':{
      subtitle:'Vinyl Chloride-Vinyl Acetate (VC/VAc) copolymers for lower fusion temperatures and high adhesion.',
      overview:'PVC Copolymer resins contain vinyl acetate comonomers that lower fusion and processing temperatures while significantly increasing polymer solubility and substrate adhesion. Excellent for vinyl composition tiles (VCT), sound-dampening sheets, printing inks, and coatings.',
      applications:['Vinyl flooring and composition tiles','Surface coatings and printing inks','Heat-sealable vinyl coatings','Plasticized acoustic and vibration sheets']
    },
    'plasticizers':{
      subtitle:'Comprehensive portfolio of primary and secondary plasticizers for flexible PVC compounding.',
      overview:'We distribute high-purity primary plasticizers (including DOTP, DINP, DOP, and DOA) and secondary plasticizers (such as Epoxidized Soybean Oil - ESBO) to impart flexibility, low-temperature elasticity, and processability to PVC compounds.',
      applications:['Artificial leather and coated fabrics','Flexible PVC cables and wiring','Flexible hoses, tubing, and gaskets','Footwear compounds and vinyl toys']
    },
    'release-paper':{
      subtitle:'Premium casting release papers for synthetic leather (PVC and PU leathercloth) casting lines.',
      overview:'Casting release paper engineered with specialized silicone or non-silicone coatings on heat-resistant base paper. Imparts precise grain textures, matte or gloss optical finishes, and reliable release characteristics through multiple heating cycles in artificial leather manufacture.',
      applications:['PVC and PU synthetic leather casting lines','Automotive and upholstery leathercloth','Fashion footwear and apparel fabrics','Embossed decorative vinyl sheets']
    },
    'blowing-agent':{
      subtitle:'Azodicarbonamide (ADCL / ADC) chemical blowing agents for PVC, EVA, and rubber foaming.',
      overview:'Azodicarbonamide is an exothermic chemical foaming agent widely used in cellular plastics. Decomposes at controlled processing temperatures to generate nitrogen gas, creating uniform microcellular foam structures in PVC leather foam layers, EVA slippers, and thermal insulation.',
      applications:['Artificial leather foamed intermediate layers','EVA and PE cross-linked foam sheets','PVC foam boards and co-extruded profiles','Rubber insulation and shoe soling']
    },
    'pu-adhesive':{
      subtitle:'High-strength polyurethane adhesives and bonding primers for footwear and industrial lamination.',
      overview:'Polyurethane adhesives formulated for superior initial tack, high green strength, and long-term bond durability. Widely applied in footwear assembly (sole-to-upper bonding), synthetic leather lamination, automotive interior trim, and flexible textile bonding.',
      applications:['Footwear sole attachment and lasting','Synthetic leather and fabric lamination','Automotive interior headliners and door trims','Industrial flexible substrate bonding']
    },
    'processing-aid':{
      subtitle:'Acrylic processing aids and lubricating modifiers for efficient PVC melt fusion and surface finish.',
      overview:'High-molecular-weight acrylic processing aids accelerate PVC powder fusion, increase melt elasticity and strength, prevent melt fracture, and improve surface gloss during high-speed extrusion and calendering.',
      applications:['PVC pipes, fittings, and conduit extrusion','Window profiles and siding panels','Rigid and semi-rigid calendered films','Foam core pipes and PVC foam boards']
    },
    'cpe':{
      subtitle:'Chlorinated Polyethylene (CPE 135A) impact modifier for rigid PVC weatherability and toughness.',
      overview:'Chlorinated Polyethylene (CPE) is a rubber-like thermoplastic modifier that dramatically enhances the notched impact strength, low-temperature ductility, and outdoor weatherability of rigid PVC products.',
      applications:['PVC window profiles and doors','PVC pressure and drainage pipes','Rigid PVC siding and fence profiles','Flame-retardant rubber compounding']
    },
    'methyl-tin-stabilizer':{
      subtitle:'High-efficiency organotin heat stabilizer for crystal-clear PVC processing and potable water pipes.',
      overview:'Methyl Tin Mercaptide thermal stabilizer provides outstanding dynamic thermal stability, early color hold, and exceptional transparency during rigid PVC processing. Completely free of sulfur staining in clear sheet extrusion.',
      applications:['Crystal clear PVC sheets and packaging film','Potable water PVC pipe extrusion','Rigid PVC profiles and fittings','Blow-molded vinyl containers']
    }
  };

  const copy=productCopy[p.slug]||{
    subtitle:'Industrial chemical raw material distributed by S. R. Polyvinyl Ltd.',
    overview:`${p.name} is a key component of S. R. Polyvinyl's chemical distribution catalog. Contact our New Delhi technical sales desk for grade-specific information, packaging details, and current supply availability.`,
    applications:['PVC compounding and processing','Industrial manufacturing','Specialty chemical formulation']
  };

  return head(p.name,copy.subtitle,true)+`
  <section class="section wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-image">${productImage(p)}</div>
        <p class="source-note">Material illustration. Confirm manufacturer grade and packaging upon enquiry.</p>
      </div>
      <div>
        <p class="eyebrow">MATERIAL / ${p.number}</p>
        <h2>Product Overview</h2>
        <p class="copy">${escapeHtml(copy.overview)}</p>
        <div class="notice">
          <strong>Technical specifications available on request:</strong> Connect with our team to obtain verified Technical Data Sheets (TDS), safety data (MSDS), and Certificate of Analysis (CoA) for your required grade.
        </div>
        <dl class="specs">
          <div><dt>Supply Format</dt><dd>Standard industrial packaging</dd></div>
          <div><dt>Manufacturer / Grade</dt><dd>Confirmed upon enquiry</dd></div>
          <div><dt>Technical Data Sheet</dt><dd>Available on request</dd></div>
          <div><dt>Price &amp; Availability</dt><dd>On commercial enquiry</dd></div>
        </dl>
        <div class="actions">
          <a class="button" href="#/contact?product=${encodeURIComponent(p.name)}">Enquire About ${escapeHtml(p.name)}</a>
          <a class="button outline" href="#/products">All Products</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <p class="eyebrow">APPLICATIONS</p>
      <h2>Key Industrial Applications</h2>
      <div class="subproduct-grid">
        ${copy.applications.map((app,idx)=>`
          <div class="subproduct-item">
            <span class="subproduct-badge">APPLICATION / 0${idx+1}</span>
            <h3>${escapeHtml(app)}</h3>
            <p>Engineered to meet standard processing parameters in industrial compounding and manufacturing lines.</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section wrap" style="background:#f4f5f6;padding-block:60px;">
    <div class="wrap">
      <div class="section-heading">
        <h2>Related Raw Materials</h2>
        <a class="text-link" href="#/products">Full catalog</a>
      </div>
      <div class="cards">
        ${(p.related?p.related.map(s=>products.find(x=>x.slug===s)).filter(Boolean):products.filter(x=>x!==p).slice(0,4)).map(card).join('')}
      </div>
    </div>
  </section>`+cta(p.name);
}

function renderRemovedProduct(removedKey){
  const item=removedProducts[removedKey];
  return head(item.name,'Catalog Update Notice',true)+`
  <section class="section wrap">
    <div class="redirect-banner">
      <h3>Product Catalog Update: ${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.reason)}</p>
      <div class="actions">
        <a class="button" href="#/products/${item.redirectSlug}">Go to ${escapeHtml(item.redirectName)}</a>
        <a class="button outline" href="#/products">Browse Full Catalog</a>
        <a class="dark-link" href="#/contact" style="color:var(--ink);margin-left:12px;">Contact Sales Team</a>
      </div>
    </div>
  </section>`;
}

function detail(p){
  if(p.slug==='pvc-resin-paste') return pasteResin();
  if(p.slug==='de-aromatised-solvents') return solventsPage();
  if(p.slug==='additives-for-pvc-leather') return pvcAdditivesPage();
  if(p.slug==='chlorinated-paraffin-cpw') return cpwPage();
  return genericDetail(p);
}

function contact(slugOrName){
  let selectedName=slugOrName||'General enquiry';
  const foundBySlug=products.find(p=>p.slug===slugOrName);
  if(foundBySlug) selectedName=foundBySlug.name;

  return head('Let’s talk materials.','Tell us what you need. Start a conversation with our New Delhi sales team.',false,'contact')+`
  <section class="section wrap contact-grid">
    <div>
      <p class="eyebrow">GET IN TOUCH</p>
      <h2>A direct line<br>to our team.</h2>
      <div class="contact-block">
        <h3>Visit our office</h3>
        <p>4261/3, Jai Mata Market,<br>Trinagar, Delhi – 110035, India</p>
      </div>
      <div class="contact-block">
        <h3>Call our sales desk</h3>
        <a href="tel:+918586980901">+91 8586 980 901</a>
        <a href="tel:+918586980905">+91 8586 980 905</a>
      </div>
      <div class="contact-block">
        <h3>Email enquiries</h3>
        <a href="mailto:srpolyvinyl@gmail.com">srpolyvinyl@gmail.com</a>
      </div>
      <p class="source-note">Official contact details verified from company records.</p>
    </div>
    <form id="enquiry">
      <h2>Product Enquiry</h2>
      <p class="form-note">Submit your raw material requirement below to receive a formal quotation and technical data.</p>
      <div class="form-row">
        <label>Your Name *<input name="name" autocomplete="name" required maxlength="100" placeholder="Full name"></label>
        <label>Email Address *<input name="email" type="email" autocomplete="email" required maxlength="150" placeholder="name@company.com"></label>
      </div>
      <div class="form-row">
        <label>Company Name<input name="company" autocomplete="organization" maxlength="150" placeholder="Your manufacturing unit"></label>
        <label>Phone Number *<input name="phone" type="tel" required maxlength="25" placeholder="+91 98765 43210"></label>
      </div>
      <label>Product Group
        <select name="product">
          <option value="General enquiry">General enquiry</option>
          ${products.map(p=>`<option value="${escapeHtml(p.name)}" ${selectedName===p.name?'selected':''}>${escapeHtml(p.name)}</option>`).join('')}
        </select>
      </label>
      <label>Your Requirements *
        <textarea name="message" required maxlength="2000" placeholder="Please specify target application, preferred manufacturer or grade, required quantity (e.g. 5 MT), and delivery destination…"></textarea>
      </label>
      <button class="button" type="submit">Preview &amp; Send Enquiry</button>
      <div id="form-result" aria-live="polite"></div>
    </form>
  </section>`;
}

function closeMenu(){
  menu.setAttribute('aria-expanded','false');
  nav.classList.remove('open');
}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&nav.classList.contains('open')){
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click',e=>{
  if(!e.target.closest('header')) closeMenu();
});
nav.addEventListener('click',e=>{
  if(e.target.closest('a')) closeMenu();
});
document.querySelector('.skip').addEventListener('click',e=>{
  e.preventDefault();
  main.focus();
  main.scrollIntoView();
});

// Dynamic SEO structured data injector
function updateStructuredData(pageType,data){
  let script=document.querySelector('#structured-data');
  if(!script){
    script=document.createElement('script');
    script.id='structured-data';
    script.type='application/ld+json';
    document.head.appendChild(script);
  }

  const baseOrg={
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"S. R. Polyvinyl Ltd.",
    "url":"https://www.srpolyvinyl.com/",
    "logo":"https://www.srpolyvinyl.com/srpolyvinyl/assets/original-logo.webp",
    "foundingDate":"2001",
    "address":{
      "@type":"PostalAddress",
      "streetAddress":"4261/3, Jai Mata Market, Trinagar",
      "addressLocality":"Delhi",
      "postalCode":"110035",
      "addressCountry":"IN"
    },
    "contactPoint":{
      "@type":"ContactPoint",
      "telephone":"+91-8586980901",
      "contactType":"sales",
      "areaServed":"IN",
      "availableLanguage":"English, Hindi"
    }
  };

  let schema=baseOrg;

  if(pageType==='product'&&data){
    schema={
      "@context":"https://schema.org",
      "@type":"Product",
      "name":data.name,
      "description":`High quality ${data.name} supplied by S. R. Polyvinyl Ltd. for industrial polymer and plastics manufacturing.`,
      "category":"Chemicals & Raw Materials",
      "offers":{
        "@type":"Offer",
        "priceCurrency":"INR",
        "availability":"https://schema.org/InStock",
        "seller":{
          "@type":"Organization",
          "name":"S. R. Polyvinyl Ltd."
        }
      }
    };
  } else if(pageType==='pvc-paste-resin'){
    schema=[
      {
        "@context":"https://schema.org",
        "@type":"Product",
        "name":"PVC Paste Resin",
        "description":"Emulsion and micro-suspension PVC paste resin for plastisols, artificial leather (Rexine), coatings, and dip molding.",
        "category":"Polymer Resins",
        "offers":{
          "@type":"Offer",
          "priceCurrency":"INR",
          "availability":"https://schema.org/InStock",
          "seller":{"@type":"Organization","name":"S. R. Polyvinyl Ltd."}
        }
      },
      {
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[
          {
            "@type":"Question",
            "name":"What is the difference between PVC paste resin and PVC suspension resin?",
            "acceptedAnswer":{"@type":"Answer","text":"PVC paste resin has an ultrafine particle size (0.1–1.5 µm) that forms a liquid plastisol when mixed with plasticizers for spread coating and molding. Suspension PVC has coarser grains (100–150 µm) for rigid extrusion and calendering."}
          },
          {
            "@type":"Question",
            "name":"How is PVC paste resin used in artificial leather (Rexine) production?",
            "acceptedAnswer":{"@type":"Answer","text":"Paste resin is formulated into plastisols for the compact top skin coat and the foamed intermediate layer on casting release paper lines."}
          }
        ]
      }
    ];
  }

  script.textContent=JSON.stringify(schema);
}

function render(initial=false){
  const raw=location.hash.slice(1)||'/';
  const [path,query='']=raw.split('?');
  const params=new URLSearchParams(query);
  let content,title,metaDesc,activeNav,pageType='page',schemaData=null;

  if(path==='/'){
    content=home();
    title='One Stop Solution for PVC Industry | S. R. Polyvinyl Ltd.';
    metaDesc='S. R. Polyvinyl Ltd. is a premier distributor and stockist of PVC paste resin, suspension PVC, de-aromatised solvents, plasticizers and leather additives in Delhi, India.';
    activeNav='home';
  } else if(path==='/products'){
    content=catalogue();
    title='Chemical Products & Raw Material Catalog | S. R. Polyvinyl Ltd.';
    metaDesc='Explore our 16-group chemical catalog: PVC paste resin, suspension PVC, de-aromatised solvents (D-40 to D-130), CPW, plasticizers, and leather additives.';
    activeNav='products';
  } else if(path.startsWith('/products/')){
    const slug=path.slice(10);
    const p=products.find(p=>p.slug===slug);
    if(p){
      content=detail(p);
      activeNav='products';
      pageType=slug==='pvc-resin-paste'?'pvc-paste-resin':'product';
      schemaData=p;

      if(slug==='pvc-resin-paste'){
        title='PVC Paste Resin Supplier in Delhi | S. R. Polyvinyl Ltd.';
        metaDesc='High-grade PVC paste resin (emulsion/dispersion grade) for artificial leather, plastisols, tarpaulin coating and dip molding. Get quotes and technical data.';
      } else if(slug==='de-aromatised-solvents'){
        title='De-aromatised Solvents (D-40 to D-130) | S. R. Polyvinyl Ltd.';
        metaDesc='Low-aromatic aliphatic solvents D-40, D-60, D-80, D-100, D-110, D-130 for coatings, industrial cleaning, inks, and metalworking.';
      } else if(slug==='additives-for-pvc-leather'){
        title='Additives for PVC Leather | S. R. Polyvinyl Ltd.';
        metaDesc='Specialty dispersing agents, surface treatment lacquers, bonding agents, PVC paste blending resins, and Adwil Lube-40 for artificial leathercloth.';
      } else if(slug==='chlorinated-paraffin-cpw'){
        title='Chlorinated Paraffin (CPW 52) Supplier | S. R. Polyvinyl Ltd.';
        metaDesc='High-quality Chlorinated Paraffin (CPW 52) secondary plasticizer and flame retardant for PVC cables, rexine, footwear, and rubber compounding.';
      } else if(slug==='blowing-agent'){
        title='Blowing Agent (Azodicarbonamide) Supplier | S. R. Polyvinyl Ltd.';
        metaDesc='High-yield Azodicarbonamide (ADCL / ADC) foaming agent for PVC plastisol artificial leather, EVA soles, and cellular polymer compounding.';
      } else {
        title=`${p.name} Supplier in India | S. R. Polyvinyl Ltd.`;
        metaDesc=`Source verified quality ${p.name} from S. R. Polyvinyl Ltd., New Delhi. Competitive pricing, prompt supply, and technical assistance.`;
      }
    } else if(removedProducts[slug]){
      content=renderRemovedProduct(slug);
      title=`${removedProducts[slug].name} - Product Update | S. R. Polyvinyl Ltd.`;
      metaDesc=`Catalog update notice for ${removedProducts[slug].name}. Explore our updated PVC and polymer raw material portfolio.`;
      activeNav='products';
    }
  } else if(path==='/about'){
    content=about();
    title='About S. R. Polyvinyl Ltd. | PVC Raw Materials Distributor in Delhi';
    metaDesc='Established in 2001 in New Delhi, S. R. Polyvinyl Ltd. is a premier chemical raw material distributor and stockist serving plastics, leathercloth, and footwear.';
    activeNav='about';
  } else if(path==='/contact'){
    content=contact(params.get('product'));
    title='Contact Sales Team | S. R. Polyvinyl Ltd. New Delhi';
    metaDesc='Contact S. R. Polyvinyl Ltd. in New Delhi, India. Call +91 8586 980 901 or email srpolyvinyl@gmail.com for quotations, TDS, and product availability.';
    activeNav='contact';
  }

  if(!content){
    content=head('Page Not Found','Please return to our product catalog to continue browsing.')+`
    <section class="section wrap">
      <p class="copy">The requested page could not be located. Browse our 16-group materials catalog below.</p>
      <div class="actions">
        <a class="button" href="#/products">Explore All Products</a>
        <a class="dark-link" href="#/">Return to Home</a>
      </div>
    </section>`;
    title='Page Not Found | S. R. Polyvinyl Ltd.';
    metaDesc='The requested page could not be found. Explore the S. R. Polyvinyl materials catalog.';
  }

  main.innerHTML=content;
  document.title=title;

  let metaElem=document.querySelector('meta[name="description"]');
  if(metaElem) metaElem.content=metaDesc;

  // Canonical link
  let canonical=document.querySelector('link[rel="canonical"]');
  if(!canonical){
    canonical=document.createElement('link');
    canonical.rel='canonical';
    document.head.appendChild(canonical);
  }
  canonical.href=`https://www.srpolyvinyl.com/srpolyvinyl/#${path}`;

  updateStructuredData(pageType,schemaData);
  closeMenu();

  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.dataset.nav===activeNav) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });

  const form=document.querySelector('#enquiry');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const text=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nCompany: ${data.get('company')||'Not specified'}\nProduct: ${data.get('product')}\n\nRequirements:\n${data.get('message')}`;
      document.querySelector('#form-result').innerHTML=`
        <div class="form-result">
          <h3>Enquiry Preview Ready</h3>
          <p>Review your enquiry details below. Click the link to dispatch directly via your email client to our sales desk.</p>
          <pre>${escapeHtml(text)}</pre>
          <a class="button small" href="mailto:srpolyvinyl@gmail.com?subject=${encodeURIComponent('Product enquiry: '+data.get('product'))}&body=${encodeURIComponent(text)}">Dispatch via Email Client</a>
        </div>`;
      document.querySelector('#form-result').scrollIntoView({behavior:'smooth',block:'nearest'});
    });
  }

  if(!initial){
    window.scrollTo({top:0,behavior:'instant'});
    main.focus({preventScroll:true});
  }
}

window.addEventListener('hashchange',()=>render());
render(true);
