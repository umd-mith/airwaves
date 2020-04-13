import React, { Component } from "react"
import { withPrefix, graphql } from "gatsby"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'

import Layout from "../components/layout"
import "./materials.css"

class MaterialsPage extends Component {

  state = {
    open: false
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    let el = e.target
    while (el) {
      if (el.id) {
        this.setState({[el.id]: !this.state[el.id]})
        break
      } else {
        el = el.parentNode
      }
    }
  }

  render() {
    const materials = this.props.data.allFindingAidJson.nodes

    return (
      <Layout>

        <div className="page-materials">
          <section className="leader">
            <h1>Explore Related Materials</h1>
            <article>
              <p>The data below is from the NAEB paper collection, housed at the <a href="https://www.wisconsinhistory.org/" title="Wisconsin Historical Society website" target="_blank" rel="noopener noreferrer">Wisconsin Historical Society</a> on the campus of the <a href="https://www.wisc.edu/" title="University of Wisconsin-Madison website" target="_blank" rel="noopener noreferrer">University of Wisconsin-Madison</a>. The NAEB papers mainly cover the period from 1950&ndash;1970, and include correspondence, scripts, reports, promotional materials, speeches of long-time president William G. Harley, ﬁles of the Office of Research and Development and of National Educational Radio (a division of the NAEB), newsletters and other publications. Below you can access the ﬁnding aid for the collection, which contains important scope and content notes, notes about the collection’s provenance, and most importantly, the Contents List. The Contents, or what is in the boxes and folders themselves, are  organized by what are called archival "series,&rdquo; which, according to the Society of American Archivists, are &ldquo;ﬁle units or documents arranged in accordance with a ﬁling system or maintained as a unit because they relate to a particular subject or function, result from the same activity, have a particular form, or because of some other relationship arising out of their creation, receipt, or use.&rdquo;</p>
              <p>When you expand an arrow next to a folder you’ll see a link to the digitized paper materials. These will launch in a new browser tab. If you want to move on and export a different folder, close the browser tab and return to this page.</p>
            </article>
          </section>

          <section className="columns col_full">
            <article>
              <List>
                <ListItem id="i1" component="li" button onClick={this.handleClick}>
                  <ListItemText>Summary Information</ListItemText>
                  <ExpandMore />
                  <ExpandLess />
                </ListItem>
                <Collapse className="li-text" in={this.state.i1} timeout="auto" unmountOnExit>
                  <dl>
                    <dt className="info-title">Title:</dt>
                    <dd>National Association of Educational Broadcasters Records</dd>
                    <dt className="info-dates">Inclusive Dates:</dt>
                    <dd>1925-1977 (bulk 1950-1970)</dd>
                    <dt className="info-creator">Creator:</dt>
                    <dd>National Association of Educational Broadcasters</dd>
                    <dt className="info-cn">Call Number:</dt>
                    <dd>U.S. Mss 76AF; PH 3962; Audio 1244A</dd>
                    <dt className="info-qty">Quantity:</dt>
                    <dd>44.2 c.f. (112 archives boxes), 3 tape recordings, and 21 photographs</dd>
                    <dt className="info-repo">Repository:</dt>
                    <dd><a href="http://digital.library.wisc.edu/1711.dl/whsead.contact">Wisconsin Historical Society, Division of Library, Archives, and Museum Collections</a></dd>
                    <dt className="info-loc">Archival Locations:</dt>
                    <dd><a href="http://digital.library.wisc.edu/1711.dl/whsead.catalog?repl1=wihvn300-a">See the catalog entry for information on possible additional materials and shelf locations.</a><br />
                      Wisconsin Historical Society (<a href="http://digicoll.library.wisc.edu/w/wiarchives/map/map.html?whi">Map</a>)</dd>
                    <dt className="info-abstract">Abstract:</dt>
                    <dd>Records, mainly 1950&ndash;1970, of the National Association of Educational Broadcasters (NAEB), an association of educational broadcasters and public broadcasting stations. The NAEB traced its origins to the formation of the Association of College and University Broadcasting Stations in 1925. The largest part of the collection is a subject file which documents the NAEB's board of directors, committees, conventions, conferences, seminars, and workshops; the development of the Educational Television Facilities Act of 1962; projects funded through Title VII of the National Defense Education Act of 1958; a curriculum development project directed by Marshall McLuhan; programming material on such offerings as the series “Jeffersonian Heritage”; and files on the National Educational Television and Radio Center, the Fund for Adult Education, the Joint Committee on Educational Television, and other organizations and foundations interested in educational broadcasting. The NAEB disbanded in 1981.</dd>
                    <dt className="info-lang">Language:</dt>
                    <dd>English</dd>
                    <dt className="info-url">URL to cite for this finding aid:</dt>
                    <dd><a href="http://digital.library.wisc.edu/1711.dl/wiarchives.uw-whs-us0076af" title="Citation URL">http://digital.library.wisc.edu/1711.dl/wiarchives.uw-whs-us0076af</a></dd>
                  </dl>
                </Collapse>

                <ListItem id="i2" component="li" button onClick={this.handleClick}>
                  <ListItemText>Biography/History</ListItemText>
                  <ExpandMore />
                  <ExpandLess />
                </ListItem>
                <Collapse className="li-text" in={this.state.i2} timeout="auto" unmountOnExit>
                  <p>The National Association of Educational Broadcasters was founded in November 1925, as the Association of College and University Broadcasting Stations during the Fourth National Radio Conference in Washington, D.C. By the mid-1920s the idea of using radio to enhance the school curriculum and augment community service had spread rapidly: but many believed educational broadcasting was failing. The founding members of ACUBS, mostly mid-western agricultural colleges, believed that they were losing their audiences to commercial stations because their broadcast time and power were restricted to make way for the expanding commercial market. During the late 1920s ACUBS unsuccessfully appealed to Congress and the Federal Radio Commission to assign a block of channels to the states specifically for non-commercial purposes.</p>
                  <p>By the early 1930s ACUBS had begun to serve as an information clearinghouse for non-commercial stations. The first association newsletter was issued in 1930 and a script exchange program was initiated in 1931. In 1934 ACUBS adopted a new constitution and became the National Association of Educational Broadcasters.</p>
                  <p>Throughout the 1930s ACUBS/NAEB continued its battle to obtain a fixed percentage of channels for educational stations. In 1938, in an important victory for the NAEB, the FCC reserved 25 ultra-high (FM) frequency channels for non-commercial stations. In 1940 the Commission reserved the frequency band from 42,000 to 50,000 kilocycles for FM broadcasting and specifically set aside five of the resulting 40 channels for educational stations.</p>
                  <p>By the late 1940s many in the NAEB realized that educational programming on the FM band was not improving, largely because so many non-commercial operations feared the new medium of television. Most educators, however, had not been particularly interested in television broadcasting because of the high cost of installation and equipment. In 1948, at a joint meeting of the Institute for Education by Radio and the NAEB, delegates passed a resolution favoring the reservation of a block of ultra-high frequency (UHF) channels for educational stations. Although no stations were ready to begin broadcasting many feared the consequences of delaying action. In the following year the NAEB brought together 30 prominent educational broadcasters at the Allerton Seminar House at the University of Illinois to begin planning for educational television. In 1950 the NAEB assisted in organizing the ad hoc Joint Committee on Educational Television to coordinate non-commercial interests in preparation for FCC channel allocation hearings.</p>
                  <p>For these hearings, which began in November 1950, and lasted until January 1951, NAEB staff joined forces with JCET and several other educational organizations. The allocations for non-profit stations, announced by the FCC in March 1951, were considered a significant victory for non-commercial interests. Subsequently, with assistance from the NAEB and the Ford Foundation, the JCET was established as a standing organization.</p>
                  <p>In 1947 the NAEB was organized into six regional districts, and thereafter sponsored many regional conferences and workshops. In 1950 the NAEB was offered and accepted permanent headquarters and financial assistance from the University of Illinois. A merger between the Association for Education by Radio-Television and the NAEB was formalized in October 1956, with NAEB agreeing to assume the obligations and responsibilities of both.</p>
                  <p>During the early 1950s the NAEB received several grants to further its work. Funding from the W.K. Kellogg Foundation permitted a major expansion of the association's tape duplication network. Grants from the Ford Foundation and the Fund for Adult Education were used for several television production and management workshops, in addition to the establishment of the association's Engineering Service and Personnel Placement Service. Several radio series produced by the NAEB were funded with Ford grants in 1952, including: <em>The Ways of Mankind</em>, <em>People Under Communism</em>, and <em>The Jeffersonian Heritage</em>.</p>
                  <p>In 1955 Leonard Marks, NAEB general counsel, encouraged the association to seek federal funds for the construction of educational television facilities. Assisted by Senators Lyndon B. Johnson and Warren Magnuson, the legislation was introduced into the 85th, 86th and 87th Congresses. Enacted into law in 1962, the Educational Television Facilities Act provided matching funds to states for non-commercial television stations.</p>
                  <p>The National Defense Education Act of 1958 (P.L. 85-864) provided funds for research and experimentation to more effectively utilize the mass media for educational puposes. The NAEB became increasingly involved in federal programs as a result of this landmark legislation, including a Title VII project directed by Marshall McLuhan to develop curriculum materials for elementary and secondary schools. Public Law 85-864 was also used in cooperation with the U.S. Office of Education to sponsor several conferences on educational broadcasting during the period 1958&ndash;1964. Also during the early 1960s, the NAEB served as an agent of the U.S. government to deliver educational television via satellite to American Samoa.</p>
                  <p>In 1960 the NAEB relocated its headquarters to Washington, D.C. The membership approved a major reorganization in November 1963, creating four divisions within the association: (1) National Educational Radio (NER), (2) Educational Television Stations (ETS), (3) Instructional Division and (4) Individual Member Division. The new constitution granted each division almost complete autonomy in regard to fiscal, administrative and operational matters. Each division elected its own board of directors, while the four divisional boards comprised the full association board.</p>
                  <p>The NAEB played a leading role in several important developments in educational broadcasting during the mid-1960s, successes which hastened the eventual collapse of the association. Through the efforts of ETS, the NAEB helped to establish the Carnegie Commission on Educational Television. The Commission's recommendations became the core of the Public Broadcasting Act of 1967, which established the Corporation for Public Broadcasting. ETS merged with Public Broadcasting Stations (PBS) in March 1973, and withdrew its membership from the NAEB. Also in 1973, National Educational Radio severed its affiliation with the NAEB and joined National Public Radio (NPR).</p>
                  <p>The NAEB ceased functioning as a trade association in 1973 because PBS provided the same service to all non-commercial television stations, while public radio stations organized their own trade association, the Association of Public Radio Stations. These events caused serious budgetary problems for the NAEB, which in the mid-1970s unsuccessfully attempted to rebuild by shifting its orientation from stations to individual members. The NAEB dissolved in November 1981.</p>
                  <p>Several published sources, available in the State Historical Society of Wisconsin library, provide a more complete history of the NAEB: <em>NAEB History: Volume I &mdash; 1925 to 1954 </em>by Harold E. Hill; <em>NAEB History: Volume II &mdash; 1954 to 1965 </em>by W. Wayne Alford: and <em>To Serve the Public Interest: Educational Broadcasting in the United States </em>by Robert J. Blakely.</p>
                </Collapse>
                
                <ListItem id="i3" component="li" button onClick={this.handleClick}>
                  <ListItemText>Scope and Content Notes</ListItemText>
                  <ExpandMore />
                  <ExpandLess />
                </ListItem>
                <Collapse className="li-text" in={this.state.i3} timeout="auto" unmountOnExit>
                  <p>The NAEB records are arranged into six parts: (1) CENTRAL CORRESPONDENCE, (2) WILLIAM G. HARLEY SPEECHES, (3) SUBJECT FILES, (4) NATIONAL EDUCATIONAL RADIO FILES, (5) OFFICE OF RESEARCH AND DEVELOPMENT FILES, (6) PUBLICATIONS AND NEWSLETTERS.</p>
                  <p>The records of the NAEB span the years 1925 to 1977, although the coverage is uneven. The records available for the period 1925 to 1950 provide fairly thorough documentation on the association's early history and activities. Most complete are records for the period 1950 through the late 1960s, particularly those created by NAEB executive staff. The records from this period document not only the association's history, but the multitude of issues then facing the entire profession. There are no division-level records available for (1) Educational Television Stations, (2) Instructional Division or (3) Individual Member Division. Records are fragmentary for the period 1970 to 1977, and there is no documentation for the period 1978 to 1981.</p>
                  <p>The CENTRAL CORRESPONDENCE was created by executive staff of the NAEB and is arranged chronologically. Much of the documentation in this part of the collection deals with administrative and financial matters. Less extensive, but often more substantive, is correspondence with members concerning the association's activities. These files contain some of the earliest documentation of the ACUBS/NAEB, including a 1925 report on the Fourth National Radio Conference, the meeting at which ACUBS was founded.</p>
                  <p>The WILLIAM G. HARLEY SPEECHES consists entirely of remarks delivered by the NAEB president (1958&ndash;1975) and president emeritus (1976&ndash;1978), including presentations to the NAEB board, executive committee, and openings of meetings and conventions. The speeches are arranged chronologically, with statements made before the Federal Communications Commission and the U.S. House of Representatives and Senate filed separately in box 17. Prior to assuming the top-ranking position at the NAEB, Harley had served as professor of Radio-Television Education at the University of Wisconsin and as program director of WHA-Madison. A significant percentage of the speeches in this series were presented to Wisconsin audiences.</p>
                  <p>The SUBJECT FILES are arranged alphabetically and are the core of the NAEB collection. The files were maintained in the NAEB headquarters in Urbana, Illinois, and later in Washington, D.C. Although significant portions of the collection are summarized below, researchers are urged to read the container list carefully. These files contain the only set of records on the NAEB Board of Directors in the collection. In boxes 19&ndash;23 are board minutes (1947&ndash;1969), correspondence with the executive staff (1951&ndash;1962), and a small subject file. Also important are the records on the association's legal counsel, Cohn &amp; Marks, which include many materials related to the FCC and the Educational Television Facilities Act. Records of NAEB's many committees are arranged alphabetically in boxes 27&ndash;37. Committee records typically include minutes and reports, in addition to correspondence with the association's leadership. Files documenting the many conferences that the NAEB sponsored or co-sponsored are contained in boxes 37 to 41 and include programs and agendas, lectures and speeches, instructional materials, and some near-print items. Photographs of the Allerton Seminar and University Broadcasting Council are arranged in the subject file under “Photographs.” Records on the activities of individual non-commercial stations are arranged by state in boxes 77 to 80, while activities involving post-secondary institutions are filed under the heading “universities and colleges” in boxes 86 and 87. A scrapbook file consists of news clippings related to NAEB sponsored programming, grants, conferences, seminars and workshops and spans the years 1951&ndash;1956. The NAEB assisted in organizing and advising many other groups interested in various aspects of educational broadcasting, which are also arranged alphabetically, including: Joint Committee on Education Television (later renamed the Joint Council on Education Broadcasting), the Educational Media Council, and the Association for Educational Radio-Television. Records related to the NAEB's sponsorship of special projects and grant funding are located in boxes 55 through 60, listed under “Foundations,” “Fund for Adult Education,” and “Grants-in-Aid.” Of particular interest is a project directed by Marshall McLuhan funded through Title VII of the National Defense Education Act to develop instructional materials. The McLuhan files span the years 1958&ndash;1963 and contain a substantial amount of correspondence about his ideas and theories. Records on the development of the Education Television Facilities Act of 1962 are located in boxes 66&ndash;67: while information on NAEB's work with U.S. government agencies (mostly the Department of Health, Education and Welfare) is in box 85.</p>
                  <p>The NATIONAL EDUCATIONAL RADIO FILES are arranged in three parts: daily correspondence, a divisional subject file, and a 1966 survey of state radio networks. The daily correspondence files, which are arranged chronologically, consists largely of out-going correspondence to radio station directors, usually dealing with NER administrative and financial matters. The NER subject files offer insight into the division's central activities during the mid-to-late 1960s including: new technologies (such as satellite communications), copyright law revision and the “fair use” doctrine, FCC rulings, and a 1966 Wingspread Conference on educational radio. The files do not document the division's 1973 merger with National Public Radio. The 1966 survey of state radio networks includes information on staffing, technology and financing of non-commercial radio stations. Survey data is arranged alphabetically by state and includes a summary report.</p>
                  <p>The OFFICE OF RESEARCH AND DEVELOPMENT FILES document three projects in which the NAEB was involved during the late 1950s to mid-1960s: a government contract to deliver educational television via satellite to American Samoa: a “utilization project” to develop television programming to augment school curriculum: and a project with the Midwest Program on Airborne Instruction, Inc. to recommend procedures for UHF channel allocations.</p>
                  <p>The PUBLICATIONS AND NEWSLETTER FILES consist of two parts, both of which are arranged chronologically. Publications files, 1930&ndash;1964, include mostly promotional materials and brochures, membership lists, annual reports, revisions of the NAEB constitution and small pamphlets not suited for cataloging. Also available are several NAEB newsletters, including the general membership <em>Newsletter</em> (fragmentary), 1930&ndash;1967: <em>President's Memo, </em>1954&ndash;1966: <em>Washington Newsletter, </em>1963&ndash;1965: and the <em>TV Engineering Newsletter, </em>1955&ndash;1957.</p>
                </Collapse>
    
                <ListItem id="i4" component="li" button onClick={this.handleClick}>
                  <ListItemText>Administrative/Restriction Information</ListItemText>
                  <ExpandMore />
                  <ExpandLess />
                </ListItem>
                <Collapse in={this.state.i4} timeout="auto" unmountOnExit>
                  <List>
                    <ListItem>
                      <ListItemText>Four A</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Four B</ListItemText>
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem id="i5" component="li" button onClick={this.handleClick}>
                  <ListItemText>Contents List</ListItemText>
                  <ExpandMore />
                  <ExpandLess />
                </ListItem>
                <Collapse className="li-children" in={this.state.i5} timeout="auto" unmountOnExit>

                  <List disablePadding>
                  {materials.map(series => (
                    <>
                    <ListItem key={series.title} id={series.title} component="li" button onClick={this.handleClick}>
                      <ListItemText>{series.title}</ListItemText>
                      <ExpandMore />
                      <ExpandLess />
                    </ListItem>
                    <Collapse className="li-children" in={this.state[series.title]} timeout="auto" unmountOnExit>
                      <List disablePadding dense>
                      {series.boxes.map(box => (
                        <>
                        <ListItem key={`${series.title}-${box.title}`} id={`${series.title}-${box.title}`} component="li" button onClick={this.handleClick}>
                          <ListItemText>Box {box.title}</ListItemText>
                          <ExpandMore />
                          <ExpandLess />
                        </ListItem>
                        <Collapse className="li-children" in={this.state[`${series.title}-${box.title}`]} timeout="auto" unmountOnExit>
                          <List disablePadding dense>
                          {box.folders.map(folder => (
                            <ListItem key={`${series.title}-${box.title}-${folder.title}`} component="li">
                              <ListItemText>
                                <div className="folder">
                                  <div className="folder-title">
                                    Folder {folder.number} &mdash; {folder.title}
                                  </div>
                                  <div className="folder-link">
                                    <a target="_blank" rel="noopener noreferrer" href={withPrefix(`/document/${folder.id}/`)} className="button" >View Folder</a>
                                  </div>
                                </div>
                              </ListItemText>
                            </ListItem> 
                          ))}
                          </List>
                        </Collapse>
                        </>
                      ))}
                      </List>
                    </Collapse>
                    </>
                  ))}
                  </List>

                </Collapse>
              </List>
            </article>
          </section>
        </div>

      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allFindingAidJson {
      nodes {
        title
        boxes {
          title
          folders {
            id
            title
            number
          }
        }
      }
    }
  }
`

export default MaterialsPage
