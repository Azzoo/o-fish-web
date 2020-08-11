import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import SeeAll from "../../partials/see-all-link/see-all-link";
import TextViewer from "../../partials/text-viewer/text-viewer";

import VesselHeaderInfo from "./../../partials/overview-pages/vessel-header-info/vessel-header-info.component";
import BoardingsOverview from "./../../partials/overview-pages/boardings-overview/boardings-overview.component";
import ViolationsOverview from "./../../partials/overview-pages/violations-overview/violations-overview.component";
import PhotosOverview from "./../../partials/overview-pages/photo-overview/photo-overview.component";
import NotesOverview from "./../../partials/overview-pages/notes-overview/notes-overview.component";

import VesselDataHelper from "../vessel-data.helper";
import VesselOverviewService from "./../../../services/vessel-overview.service";

import "./vessel-view.css";

const vesselService = VesselOverviewService.getInstance();

class VesselViewPage extends Component {
  state = {
    permitNumbers: ["N/A"],
    vesselNames : ["N/A"],
    notes: [],
    photos: [],
    vessel: null,
    boardings: [],
    violations: [],
    crew: [],
    deliveries: [],
    homePorts: [],
    captains: [],
    nationalities: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id == "no_permit_number") return;
    if (id.indexOf("pn") === 0){
      const permitNumber = id.substring(2);
      vesselService
        .getBoardingsByPermitNumber(permitNumber)
        .then((data) => {
          const dataHelper = new VesselDataHelper(permitNumber, data);
          const newState = {
            permitNumbers: dataHelper.getPermitNumbers(),
            vesselNames: dataHelper.getVesselNames(),
            boardings: dataHelper.getBoardings(),
            nationalities: dataHelper.getNationalities(),
            homePorts: dataHelper.getHomePorts(),
            captains: dataHelper.getCaptains(),
            crew: dataHelper.getCrew(),
            deliveries: dataHelper.getDeliveries(),
          };
          console.log(data, newState);
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (id.indexOf("in") === 0){
        const itemName = id.substring(2);
        vesselService
          .getBoardingsByVesselName(itemName)
          .then((data) => {
            const dataHelper = new VesselDataHelper(itemName, data);
            const newState = {
              permitNumbers: dataHelper.getPermitNumbers(),
              vesselNames: dataHelper.getVesselNames(),
              boardings: dataHelper.getBoardings(),
              nationalities: dataHelper.getNationalities(),
              homePorts: dataHelper.getHomePorts(),
              captains: dataHelper.getCaptains(),
              crew: dataHelper.getCrew(),
              deliveries: dataHelper.getDeliveries(),
            };
            console.log(data, newState);
            this.setState(newState);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }

  render() {
    const { nationalities, vesselNames, homePorts, captains, boardings, deliveries, permitNumbers } = this.state;
    const { t } = this.props;
    const id = this.props.match.params.id;
    
    return (
      <div className="flex-column align-center padding-top vessel-view-page">
        {id !== "no_permit_number" ? (
          <Fragment>
            <div className="flex-row align-center standard-view">
              <div>
                <div className="item-label">{t("TABLE.VESSEL")}</div>
                <div className="item-name">{vesselNames[0]}</div>
              </div>
            </div>
            <div className="flex-row justify-between standard-view">
              <VesselHeaderInfo
                headerText="Permit Number"
                data={permitNumbers}
              />
              <VesselHeaderInfo
                headerText="Flag States"
                data={nationalities}
                itemsAmount={nationalities.length}
              />
              <VesselHeaderInfo
                headerText="Home Ports"
                data={homePorts}
                itemsAmount={homePorts.length}
              />
              <VesselHeaderInfo
                headerText="Captains"
                data={captains}
                itemsAmount={captains.length}
              />
            </div>
            <div className="flex-row standard-view">
              <BoardingsOverview boardings={boardings} />
            </div>
            <div className="flex-row standard-view">
              <div className="flex-column justify-between box-shadow white-bg margin-top margin-right">
                <div className="flex-row justify-between padding border-bottom gray-bg">
                  <h3>Crew Members</h3>
                  <div className="item-label">16</div>
                </div>
                <div className="flex-row border-bottom padding-bottom padding-top justify-between margin-left margin-right crew-list">
                  <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                    <div className="flex-row half-row-view">
                      <TextViewer
                        mainText="Marlin Nemo"
                        subText="Permit #12984567"
                        mainTextFirst={true}
                      />
                    </div>
                    <div className="flex-row align-center half-row-view">
                      <div className="sm-photo-icon">
                        <img
                          className="icon"
                          src={require("../../../assets/photo-icon.png")}
                          alt="no logo"
                        />
                      </div>
                      <div className="item-label">+6</div>
                    </div>
                  </div>
                  <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                    <div className="flex-row half-row-view">
                      <TextViewer
                        mainText="Marlin Nemo"
                        subText="Permit #12984567"
                        mainTextFirst={true}
                      />
                    </div>
                    <div className="flex-row align-center half-row-view">
                      <div className="sm-photo-icon">
                        <img
                          className="icon"
                          src={require("../../../assets/photo-icon.png")}
                          alt="no logo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                    <div className="flex-row half-row-view">
                      <TextViewer
                        mainText="Marlin Nemo"
                        subText="Permit #12984567"
                        mainTextFirst={true}
                      />
                    </div>
                    <div className="flex-row align-center half-row-view">
                      <div className="sm-photo-icon">
                        <img
                          className="icon"
                          src={require("../../../assets/photo-icon.png")}
                          alt="no logo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                    <div className="flex-row half-row-view">
                      <TextViewer
                        mainText="Marlin Nemo"
                        subText="Permit #12984567"
                        mainTextFirst={true}
                      />
                    </div>
                    <div className="flex-row align-center half-row-view">
                      <div className="sm-photo-icon">
                        <img
                          className="icon"
                          src={require("../../../assets/photo-icon.png")}
                          alt="no logo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-row align-center half-row-view">
                    <div className="flex-row half-row-view">
                      <TextViewer
                        mainText="Marlin Nemo"
                        subText="Permit #12984567"
                        mainTextFirst={true}
                      />
                    </div>
                    <div className="flex-row align-center half-row-view">
                      <div className="sm-photo-icon">
                        <img
                          className="icon"
                          src={require("../../../assets/photo-icon.png")}
                          alt="no logo"
                        />
                      </div>
                      <div className="item-label">+4</div>
                    </div>
                  </div>
                </div>
                <div className="flex-row justify-center padding-top padding-bottom">
                  <SeeAll />
                </div>
              </div>
              <div className="flex-column box-shadow white-bg margin-top license-section delivery-section">
                <div className="flex-row justify-between padding border-bottom gray-bg">
                  <h3>Deliveries</h3>
                  <div className="item-label">{deliveries.length}</div>
                </div>
                <table className="boardings-table margin-left margin-right">
                  <thead>
                    <tr className="row-head border-bottom">
                      <td>{t("TABLE.DATE")}</td>
                      <td>{t("TABLE.BUSINESS")}</td>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery, ind) => (
                      <tr key={ind} className="table-row row-body">
                        <td>
                          <div>
                            <div className="delivery-name">{delivery.name}</div>
                            <div className="delivery-address">
                              {delivery.location}
                            </div>
                          </div>
                        </td>
                        <td>{moment(delivery.date).format("L")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex-row justify-center padding-top">
                  <SeeAll />
                </div>
              </div>
            </div>
            <div className="flex-row standard-view">
              <ViolationsOverview />
            </div>
            <div className="flex-row justify-between standard-view margin-bottom">
              <PhotosOverview />
              <NotesOverview />
            </div>
          </Fragment>
        ) : (
          <div className="flex-row justify-center standard-view">
            {t("WARNINGS.NO_PERMIT_NUMBER")}
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(VesselViewPage);
