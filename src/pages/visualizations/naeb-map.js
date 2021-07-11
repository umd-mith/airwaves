import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import IFrame from "../../components/iframe"

const MapPage = () => {
  return (
    <Layout>
      <div className="page-visualization-naeb-map">
        <section>
          <div className="text-block">
            <h2>
              <Link className="breadcrumb" to="/visualizations/">
                Visualizations
              </Link>{" "}
              Map of U.S. Organizations in the NAEB
            </h2>
            <p>
              This map lets you explore some of the major organizations who
              participated in the National Association of Educational
              Broadcasters, such as radio stations, universities, broadcasting
              companies, and other educational organizations. Each black dot on
              the map represents one organization, and you can click to get more
              information about an organization and a link to that
              organization's landing page on Unlocking the Airwaves, which
              includes all the collection materials the organization created or
              contributed to. The states are shaded to represent their NAEB
              region, an organizational structure within the NAEB that helped
              geographically close NAEB members to meet and collaborate. Pan and
              zoom around the map using your mouse or the tools in the upper
              left corner.
            </p>
          </div>
        </section>
        <section id="map" className="full-bleed">
          <IFrame
            title="Unlocking the Airwaves - U.S. Map of Major Organizations"
            src="https://public.tableau.com/views/UnlockingtheAirwaves-U_S_MapofMajorOrganizations/AirwavesU_S_Map?:language=en-US&:showVizHome=no&:embed=true"
            height="800"
          />
        </section>
      </div>
    </Layout>
  )
}

export default MapPage
