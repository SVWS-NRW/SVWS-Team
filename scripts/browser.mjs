import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import assert from 'node:assert/strict'
import project from '../.vitepress/project.json' with { type: 'json' }
import navigation from '../.vitepress/navigation.json' with { type: 'json' }

const dist=resolve('.vitepress/dist')
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'}
const server=createServer(async (request,response)=>{
 try{
  const url=new URL(request.url,'http://localhost')
  let pathname=decodeURIComponent(url.pathname)
  if(pathname.endsWith('/'))pathname+='index.html'
  if(!extname(pathname))pathname+='.html'
  const file=resolve(dist,'.'+pathname)
  if(!file.startsWith(dist+sep))throw Error('Ungültiger Pfad')
  const bytes=await readFile(file)
  response.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'})
  response.end(bytes)
 }catch{
  response.writeHead(404)
  response.end()
 }
})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
const base='http://127.0.0.1:'+server.address().port
let browser
await mkdir('test-results',{recursive:true})
try{
 browser=await chromium.launch()
 const page=await browser.newPage()
 await page.addInitScript(()=>{window.print=()=>{window.__printCount=(window.__printCount||0)+1}})
 const pageErrors=[]
 page.on('pageerror',error=>pageErrors.push(error.message))
 const view=async route=>{
  const response=await page.goto(base+route,{waitUntil:'networkidle'})
  assert.equal(response.status(),200,route)
 }
 const headings=project.repo.endsWith('SVWS-Schulungen')?['Arnsberg','Detmold','Düsseldorf','Köln','Münster','Hilfe']:['Neu im Team','Fachberatung','Moderation','Datenbanken & Installation','Fortbildung','Wissen & Links','Hilfe']
 await page.setViewportSize({width:1440,height:900})
 await view('/')
 for(const [label,route] of [['Impressum','impressum'],['Datenschutzerklärung','datenschutz'],['Barrierefreiheitserklärung','barrierefreiheit'],['Leichte Sprache','leichtesprache'],['Lizenz','LICENSE']]){
  const link=page.locator('.site-footer').getByRole('link',{name:label,exact:true})
  assert.equal(await link.getAttribute('href'),'/'+route+'.html')
  await link.click()
  await page.waitForURL('**/'+route+'.html')
  await view('/')
 }
 assert.deepEqual((await page.locator('.VPNavBarMenu > a').allTextContents()).map(text=>text.trim()),headings)
 const article='/hilfe/github-editor.html'
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900})
  await view(article)
  const controls=page.locator('h1 .article-print-controls')
  await controls.waitFor()
  assert.deepEqual(await controls.locator('a').evaluateAll(links=>links.map(link=>link.href)),[
   'https://github.com/'+project.repo+'/edit/dev/hilfe/github-editor.md',
   'https://github.dev/'+project.repo+'/blob/dev/hilfe/github-editor.md'
  ])
  for(const dark of [false,true]){
   await page.evaluate(value=>document.documentElement.classList.toggle('dark',value),dark)
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Kein horizontaler Überlauf')
   await page.emulateMedia({media:'print'})
   assert.equal(await controls.evaluate(node=>getComputedStyle(node).display),'none')
   await page.emulateMedia({media:'screen'})
  }
  await controls.locator('button').click()
  await page.waitForFunction(()=>window.__printCount===1)
 }
 await view('/hilfe/mitarbeiten.html')
 await page.locator('.article-editor-link').first().waitFor()
 assert.equal(await page.locator('.article-editor-link').first().getAttribute('href'),'https://github.com/'+project.repo+'/edit/dev/CONTRIBUTING.md')
 await view('/hilfe/redaktionsworkflow.html')
 await page.locator('.article-editor-link').first().waitFor()
 assert.equal(await page.locator('.article-editor-link').first().getAttribute('href'),'https://github.com/'+project.repo+'/edit/dev/WORKFLOW.md')
 await view('/hilfe/alle-artikel.html')
 assert.ok(await page.locator('.article-index a').count()>10)
 assert.match(await page.locator('.article-index a').first().getAttribute('href'),/artikel=az/)
 await view('/hilfe/github-editor.html?artikel=az')
 await page.locator('.article-editor-link').first().waitFor()
 await page.locator('#VPSidebarNav a[href*="artikel=az"]').first().waitFor({state:'attached'})
 await view('/bilder/')
 const catalog=page.locator('.vp-doc img').first()
 await catalog.waitFor()
 assert(await catalog.evaluate(img=>img.decode().then(()=>img.naturalWidth>0)))
 for(const group of Object.values(navigation.sections)){
  const link=group.find(item=>item.link?.startsWith('/druck/')).link
  await view(link+'.html')
  assert.ok(await page.locator('.book-toc li').count()>0,link)
  assert.equal(await page.locator('.article-print-controls').count(),0)
 }
 for(const route of ['/druck/hilfe.html', project.repo.endsWith('SVWS-Schulungen') ? '/druck/arnsberg.html' : '/druck/datenbanken-installation.html']){
  await view(route)
  await page.locator('.book-toolbar button').click()
  await page.waitForFunction(()=>window.__printCount===1)
 }
 assert.deepEqual(pageErrors,[],'Keine Browserfehler')
 console.log('Kopfmenü, Druck und Editoren, A–Z-Navigation, Bilderkatalog und Rubrikdruck geprüft.')
}catch(error){
 if(browser?.contexts()[0]?.pages()[0])await browser.contexts()[0].pages()[0].screenshot({path:'test-results/bedienung.png',fullPage:false})
 throw error
}finally{
 await browser?.close()
 server.close()
}
