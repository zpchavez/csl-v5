import{d as c}from"./db-C8rzBqDN.js";function l(){return`JOIN metadata_titles ON metadata_main.title_id = metadata_titles.title_id
      JOIN metadata_author_title_map ON metadata_author_title_map.title_id = metadata_titles.title_id
      JOIN metadata_authors ON metadata_authors.author_id = metadata_author_title_map.author_id
      LEFT JOIN metadata_character_map ON metadata_character_map.episode_id = metadata_main.episode_id
      LEFT JOIN metadata_characters ON metadata_character_map.character_id = metadata_characters.character_id
      LEFT JOIN metadata_term_map ON metadata_term_map.episode_id = metadata_main.episode_id
      LEFT JOIN thesaurus_terms ON thesaurus_terms.term_id = metadata_term_map.term_id`}const E={getUsageCount(t){if(t.length===0)return{};const e=`
      WITH RECURSIVE term_tree AS (
        SELECT term_id, term_id as root_term_id
        FROM thesaurus_terms
        WHERE term_id IN (${t.map(()=>"?").join(",")})
        UNION ALL
        SELECT tt.term_id, ttree.root_term_id
        FROM thesaurus_terms tt
        JOIN thesaurus_relationships tr
        ON tt.term_id = tr.related_id
        JOIN term_tree ttree
        ON tr.term_id = ttree.term_id
        WHERE tr.type = 'NT'
      )
      SELECT
        ttree.root_term_id,
        COUNT(DISTINCT mtm.episode_id) AS usageCount
      FROM metadata_term_map mtm
      JOIN term_tree ttree
      ON mtm.term_id = ttree.term_id
      GROUP BY ttree.root_term_id
    `,a=c.prepare(e);a.bind(t);const i={};for(t.forEach(r=>{i[r]=0});a.step();){const r=a.getAsObject();i[r.root_term_id]=r.usageCount}return a.free(),i},async getTermDetails(t){const s=(_,d)=>{const m=`
        SELECT
          thesaurus_terms.term_id,
          thesaurus_terms.term
        FROM thesaurus_terms
        JOIN thesaurus_relationships
        ON thesaurus_terms.term_id = thesaurus_relationships.related_id
        WHERE type = ?
        AND thesaurus_relationships.term_id = ?
      `,u=[d,_],p=c.prepare(m);return p.bind(u),p},e=_=>{const d=[];for(;_.step();){const m=_.getAsObject();d.push({term_id:m.term_id,term:m.term,is_preferred:!0,usageCount:0})}return d},a=_=>{const d=[];for(;_.step();){const m=_.getAsObject();d.push({term_id:m.term_id,term:m.term,is_preferred:!1})}return d},i=c.prepare(`
      SELECT
        term_id,
        term,
        is_preferred
      FROM thesaurus_terms
      WHERE term_id = ?
      LIMIT 1
    `);i.bind([t]),i.step();const r=i.getAsObject();if(i.free(),!r.term_id)return!1;if(r.is_preferred){const _={term_id:r.term_id,term:r.term,is_preferred:!0,usageCount:r.usageCount},d=e(s(t,"BT")),m=e(s(t,"NT")),u=e(s(t,"RT")),p=a(s(t,"UF")),h=this.getUsageCount([...d.map(o=>o.term_id),...m.map(o=>o.term_id),...u.map(o=>o.term_id)]);return d.forEach(o=>{o.usageCount=h[o.term_id]||0}),m.forEach(o=>{o.usageCount=h[o.term_id]||0}),u.forEach(o=>{o.usageCount=h[o.term_id]||0}),{term:_,broader_terms:d,narrower_terms:m,related_terms:u,used_for_terms:p}}else{const _={term_id:r.term_id,term:r.term,is_preferred:!1},d=s(t,"USE"),m=e(d),u=this.getUsageCount(m.map(h=>h.term_id));return m.forEach(h=>{h.usageCount=u[h.term_id]||0}),{term:_,use_terms:m}}}},S=(t,s)=>{const e=[],a=[];return t.year&&s!=="years"&&(e.push("strftime('%Y', date) = ?"),a.push(t.year.toString())),t.title&&s!=="titles"&&(e.push("metadata_titles.title_id = ?"),a.push(t.title.toString())),t.author&&s!=="authors"&&(e.push("metadata_authors.author_id = ?"),a.push(t.author.toString())),t.character&&s!=="characters"&&(e.push("metadata_characters.character_id = ?"),a.push(t.character.toString())),t.term&&s!=="terms"&&(e.push("thesaurus_terms.term_id = ?"),a.push(t.term.toString())),[e.length?e.join(" AND "):"true",a]},f=(t,s)=>new Promise(e=>{setTimeout(()=>{const[a,i]=S(s,t.name),r=c.prepare(`SELECT DISTINCT ${t.select.join(", ")}
          FROM metadata_main ${l()}
          WHERE ${a}
          ${t.idCol?` AND ${t.idCol} IS NOT NULL `:""}
          ${t.groupBy?` GROUP BY ${t.groupBy} `:""}
          ORDER BY ${t.orderBy}
          `);r.bind(i);const _=[];for(;r.step();){const d=r.getAsObject();d.value&&d.label&&_.push({label:d.label,value:d.value,...d.count?{count:d.count}:{}})}r.free(),e(_)},0)}),O={async getLatestUploadedEpisodes(t=10){const s=c.prepare(`
      SELECT DISTINCT
        metadata_main.episode_id,
        metadata_main.title_id,
        metadata_titles.title,
        metadata_authors.author_id,
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) AS author,
        metadata_main.suffix,
        metadata_main.date,
        metadata_main.episode_title,
        metadata_main.transcript,
        metadata_main.summary,
        metadata_main.notes,
        metadata_titles.title
      FROM metadata_main ${l()}
      ORDER BY metadata_main.episode_id DESC
      LIMIT ?
    `);s.bind([t]);const e=[];for(;s.step();){const a=s.getAsObject();e.push({episode_id:a.episode_id,title_id:a.title_id,title:a.title,author_id:a.author_id,author:a.author,suffix:a.suffix,date:new Date(a.date),episode_title:a.episode_title,transcript:a.transcript,summary:a.summary,notes:a.notes})}return s.free(),e},async getBrowseOptions(t){const s=[{name:"years",idCol:"date",select:["strftime('%Y', date) AS label","strftime('%Y', date) AS value"],orderBy:"strftime('%Y', date)"},{name:"titles",idCol:"metadata_titles.title_id",select:["metadata_titles.title_id AS value","metadata_titles.title AS label"],orderBy:"metadata_titles.title"},{name:"authors",idCol:"metadata_authors.author_id",select:["metadata_authors.first_name || ' ' || metadata_authors.last_name AS label","metadata_authors.author_id AS value"],orderBy:"metadata_authors.last_name"},{name:"characters",idCol:"metadata_characters.character_id",select:["metadata_characters.character AS label","metadata_characters.character_id AS value"],orderBy:"metadata_characters.character"},{name:"terms",idCol:"thesaurus_terms.term_id",select:["thesaurus_terms.term AS label","thesaurus_terms.term_id AS value","COUNT(DISTINCT metadata_main.episode_id) AS count"],orderBy:"thesaurus_terms.term",groupBy:"thesaurus_terms.term_id"}],e=s.map(r=>f(r,t)),a=await Promise.all(e),i={years:[],titles:[],authors:[],characters:[],terms:[]};return s.forEach((r,_)=>{r.name==="terms"?i.terms=a[_]:i[r.name]=a[_]}),i},async searchEpisodes(t){const e=t.page||1,a=(e-1)*20,i=[],r=[];if(t.year&&(i.push("strftime('%Y', metadata_main.date) = ?"),r.push(t.year.toString())),t.title&&(i.push("metadata_titles.title_id = ?"),r.push(t.title.toString())),t.author&&(i.push("metadata_authors.author_id = ?"),r.push(t.author.toString())),t.character&&(i.push("metadata_characters.character_id = ?"),r.push(t.character.toString())),t.term&&(i.push("thesaurus_terms.term_id = ?"),r.push(t.term.toString())),t.search){i.push(`(
        metadata_main.transcript LIKE ? OR
        metadata_titles.title LIKE ? OR
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) LIKE ? OR
        thesaurus_terms.term LIKE ? OR
        metadata_characters.character LIKE ?
      )`);const n=`%${t.search}%`;r.push(n,n,n,n,n)}const _=i.length>0?`WHERE ${i.join(" AND ")}`:"",d=c.prepare(`
      SELECT COUNT(DISTINCT metadata_main.episode_id) as total
      FROM metadata_main ${l()}
      ${_}
    `);d.bind(r),d.step();const m=d.getAsObject().total;d.free();const u=c.prepare(`
      SELECT DISTINCT
        metadata_main.episode_id,
        metadata_main.title_id,
        metadata_titles.title,
        metadata_authors.author_id,
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) AS author,
        metadata_main.suffix,
        metadata_main.date,
        metadata_main.episode_title,
        metadata_main.transcript,
        metadata_main.summary,
        metadata_main.notes,
        metadata_titles.title
      FROM metadata_main ${l()}
      ${_}
      ORDER BY metadata_main.date ASC, metadata_main.episode_id DESC
      LIMIT ? OFFSET ?
    `);u.bind([...r,20,a]);const p=[];for(;u.step();){const n=u.getAsObject();p.push({episode_id:n.episode_id,title_id:n.title_id,title:n.title,author_id:n.author_id,author:n.author,suffix:n.suffix,date:new Date(n.date),episode_title:n.episode_title,transcript:n.transcript,summary:n.summary,notes:n.notes})}u.free();const h=Math.ceil(m/20);return{results:p,totalCount:m,totalPages:h,currentPage:e}},async getEpisodeById(t){const s=c.prepare(`
      SELECT DISTINCT
        metadata_main.episode_id,
        metadata_main.title_id,
        metadata_titles.title,
        metadata_authors.author_id,
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) AS author,
        metadata_main.suffix,
        metadata_main.date,
        metadata_main.episode_title,
        metadata_main.transcript,
        metadata_main.summary,
        metadata_main.notes,
        metadata_titles.title
      FROM metadata_main ${l()}
      WHERE metadata_main.episode_id = ?
      LIMIT 1
    `);s.bind([t]),s.step();const e=s.getAsObject();if(s.free(),!e.episode_id)return!1;const a=c.prepare(`
      SELECT
        metadata_characters.character_id,
        metadata_characters.character
      FROM metadata_characters
      JOIN metadata_character_map
        ON metadata_character_map.character_id = metadata_characters.character_id
      WHERE metadata_character_map.episode_id = ?
      ORDER BY metadata_characters.character ASC
    `);a.bind([t]);const i=[];for(;a.step();){const m=a.getAsObject();i.push({character_id:m.character_id,name:m.character})}a.free();const r=c.prepare(`
      SELECT
        thesaurus_terms.term_id,
        thesaurus_terms.term
      FROM thesaurus_terms
      JOIN metadata_term_map
        ON metadata_term_map.term_id = thesaurus_terms.term_id
      WHERE metadata_term_map.episode_id = ?
    `);r.bind([t]);const _=[];for(;r.step();){const m=r.getAsObject();_.push({term_id:m.term_id,term:m.term,is_preferred:!0,usageCount:0})}const d=E.getUsageCount(_.map(m=>m.term_id));return _.forEach(m=>{m.usageCount=d[m.term_id]||0}),{episode_id:e.episode_id,title_id:e.title_id,title:e.title,author_id:e.author_id,author:e.author,suffix:e.suffix,date:new Date(e.date),episode_title:e.episode_title,transcript:e.transcript,summary:e.summary,notes:e.notes,characters:i,terms:_}},async getNextAndPreviousEpisodeIds(t){const s=c.prepare(`
      SELECT metadata_main.episode_id
      FROM metadata_main
      WHERE (metadata_main.date > ? OR (metadata_main.date = ? AND metadata_main.suffix > ?))
      AND metadata_main.title_id = ?
      AND metadata_main.episode_id != ?
      ORDER BY metadata_main.date ASC, metadata_main.suffix ASC
      LIMIT 1
    `),e=t.date.toISOString().split("T")[0];s.bind([e,e,t.suffix,t.title_id,t.episode_id]),s.step();const a=s.getAsObject();s.free();const i=c.prepare(`
      SELECT metadata_main.episode_id
      FROM metadata_main
      WHERE (metadata_main.date < ? OR (metadata_main.date = ? AND metadata_main.suffix < ?))
      AND metadata_main.title_id = ?
      AND metadata_main.episode_id != ?
      ORDER BY metadata_main.date DESC, metadata_main.suffix DESC
      LIMIT 1
    `);i.bind([e,e,t.suffix,t.title_id,t.episode_id]),i.step();const r=i.getAsObject();return i.free(),{next:a.episode_id?String(a.episode_id):null,previous:r.episode_id?String(r.episode_id):null}}};export{O as m,E as t};
