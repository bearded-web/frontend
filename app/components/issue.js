/**
 * Issue component. Contain comments, activities, description,
 * vector, references, etc.
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { fromJS } from 'immutable';

import IssueActivities from './issue-activities';
import References from './references';
import { Grid, Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import Header from './header';
import SeverityIcon from './severity-icon';
import CommentForm from './comment-form';
import Comments from './comments';
import Markdown from './markdown';
import Vector from './vector';

export default class Issue extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        let {
            summary,
            activities,
            references,
            desc,
            vector,
            severity
            } = this.props.issue.toObject();

        const aStyle = {
            marginTop: '15px'
        };
        const hasReferences = !!(references && references.size);
        const hasActivities = !!(activities && activities.size);
        const vectorUrl = vector && vector.get('url');
        const headerStyle = {};
        const iconStyle = {
            display: 'block',
            float: 'left',
            marginRight: '7px'
        };

        if (vectorUrl) headerStyle.marginBottom = 0;

        vector = fromJS({
            "url": "http://testphp.vulnweb.com/search.php",
            "httpTransactions": [
                {
                    "id": 64,
                    "url": "http://testphp.vulnweb.com/search.php",
                    "method": "POST",
                    "request": {
                        "status": "POST http://testphp.vulnweb.com/search.php?test=a%27b%22c%27d%22 HTTP/1.1",
                        "header": {
                            "Accept": [
                                "*/*"
                            ],
                            "Accept-Encoding": [
                                "gzip, deflate"
                            ],
                            "Content-Length": [
                                "35"
                            ],
                            "Content-Type": [
                                "application/x-www-form-urlencoded"
                            ],
                            "Host": [
                                "testphp.vulnweb.com"
                            ],
                            "User-Agent": [
                                "w3af.org"
                            ]
                        },
                        "body": {
                            "contentEncoding": "base64",
                            "content": "YzJWaGNtTm9SbTl5UFVobGJHeHZKVEl3VjI5eWJHUW1aMjlDZFhSMGIyNDlaMjg9Cg=="
                        }
                    },
                    "response": {
                        "status": "HTTP/1.1 200 OK",
                        "header": {
                            "Connection": [
                                "keep-alive"
                            ],
                            "Content-Encoding": [
                                "gzip"
                            ],
                            "Content-Type": [
                                "text/html"
                            ],
                            "Date": [
                                "Sat, 25 Apr 2015 17:15:12 GMT"
                            ],
                            "Server": [
                                "nginx/1.4.1"
                            ],
                            "Transfer-Encoding": [
                                "chunked"
                            ],
                            "X-Powered-By": [
                                "PHP/5.3.10-1~lucid+2uwsgi2"
                            ]
                        },
                        "body": {
                            "contentEncoding": "text",
                            "content": "PCFET0NUWVBFIEhUTUwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEgVHJhbnNpdGlvbmFsLy9FTiIKImh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2xvb3NlLmR0ZCI+CjxodG1sPjwhLS0gSW5zdGFuY2VCZWdpbiB0ZW1wbGF0ZT0iL1RlbXBsYXRlcy9tYWluX2R5bmFtaWNfdGVtcGxhdGUuZHd0LnBocCIgY29kZU91dHNpZGVIVE1MSXNMb2NrZWQ9ImZhbHNlIiAtLT4KPGhlYWQ+CjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PWlzby04ODU5LTIiPgoKPCEtLSBJbnN0YW5jZUJlZ2luRWRpdGFibGUgbmFtZT0iZG9jdW1lbnRfdGl0bGVfcmduIiAtLT4KPHRpdGxlPnNlYXJjaDwvdGl0bGU+CjwhLS0gSW5zdGFuY2VFbmRFZGl0YWJsZSAtLT4KPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJzdHlsZS5jc3MiIHR5cGU9InRleHQvY3NzIj4KPCEtLSBJbnN0YW5jZUJlZ2luRWRpdGFibGUgbmFtZT0iaGVhZGVyc19yZ24iIC0tPgo8IS0tIGhlcmUgZ29lcyBoZWFkZXJzIGhlYWRlcnMgLS0+CjwhLS0gSW5zdGFuY2VFbmRFZGl0YWJsZSAtLT4KPHNjcmlwdCBsYW5ndWFnZT0iSmF2YVNjcmlwdCIgdHlwZT0idGV4dC9KYXZhU2NyaXB0Ij4KPCEtLQpmdW5jdGlvbiBNTV9yZWxvYWRQYWdlKGluaXQpIHsgIC8vcmVsb2FkcyB0aGUgd2luZG93IGlmIE5hdjQgcmVzaXplZAogIGlmIChpbml0PT10cnVlKSB3aXRoIChuYXZpZ2F0b3IpIHtpZiAoKGFwcE5hbWU9PSJOZXRzY2FwZSIpJiYocGFyc2VJbnQoYXBwVmVyc2lvbik9PTQpKSB7CiAgICBkb2N1bWVudC5NTV9wZ1c9aW5uZXJXaWR0aDsgZG9jdW1lbnQuTU1fcGdIPWlubmVySGVpZ2h0OyBvbnJlc2l6ZT1NTV9yZWxvYWRQYWdlOyB9fQogIGVsc2UgaWYgKGlubmVyV2lkdGghPWRvY3VtZW50Lk1NX3BnVyB8fCBpbm5lckhlaWdodCE9ZG9jdW1lbnQuTU1fcGdIKSBsb2NhdGlvbi5yZWxvYWQoKTsKfQpNTV9yZWxvYWRQYWdlKHRydWUpOwovLy0tPgo8L3NjcmlwdD4KCjwvaGVhZD4KPGJvZHk+IAo8ZGl2IGlkPSJtYWluTGF5ZXIiIHN0eWxlPSJwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6NzAwcHg7IHotaW5kZXg6MSI+CjxkaXYgaWQ9Im1hc3RoZWFkIj4gCiAgPGgxIGlkPSJzaXRlTmFtZSI+PGEgaHJlZj0iaHR0cDovL3d3dy5hY3VuZXRpeC5jb20vIj48aW1nIHNyYz0iaW1hZ2VzL2xvZ28uZ2lmIiB3aWR0aD0iMzA2IiBoZWlnaHQ9IjM4IiBib3JkZXI9IjAiPjwvYT48L2gxPiAgIAogIDxoNiBpZD0ic2l0ZUluZm8iPlRFU1QgYW5kIERlbW9uc3RyYXRpb24gc2l0ZSBmb3IgQWN1bmV0aXggV2ViIFZ1bG5lcmFiaWxpdHkgU2Nhbm5lcjwvaDY+CiAgPGRpdiBpZD0iZ2xvYmFsTmF2Ij4gCiAgICAgIAk8dGFibGUgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj48dHI+Cgk8dGQgYWxpZ249ImxlZnQiPgoJCTxhIGhyZWY9ImluZGV4LnBocCI+aG9tZTwvYT4gfCA8YSBocmVmPSJjYXRlZ29yaWVzLnBocCI+Y2F0ZWdvcmllczwvYT4gfCA8YSBocmVmPSJhcnRpc3RzLnBocCI+YXJ0aXN0cwoJCTwvYT4gfCA8YSBocmVmPSJkaXNjbGFpbWVyLnBocCI+ZGlzY2xhaW1lcjwvYT4gfCA8YSBocmVmPSJjYXJ0LnBocCI+eW91ciBjYXJ0PC9hPiB8IAoJCTxhIGhyZWY9Imd1ZXN0Ym9vay5waHAiPmd1ZXN0Ym9vazwvYT4gfCAKCQk8YSBocmVmPSJBSkFYL2luZGV4LnBocCI+QUpBWCBEZW1vPC9hPgoJPC90ZD4KCTx0ZCBhbGlnbj0icmlnaHQiPgoJCTwvdGQ+Cgk8L3RyPjwvdGFibGU+CiAgPC9kaXY+IAo8L2Rpdj4gCjwhLS0gZW5kIG1hc3RoZWFkIC0tPiAKCjwhLS0gYmVnaW4gY29udGVudCAtLT4KPCEtLSBJbnN0YW5jZUJlZ2luRWRpdGFibGUgbmFtZT0iY29udGVudF9yZ24iIC0tPgo8ZGl2IGlkPSJjb250ZW50Ij4KCQpXYXJuaW5nOiBteXNxbF9mZXRjaF9hcnJheSgpIGV4cGVjdHMgcGFyYW1ldGVyIDEgdG8gYmUgcmVzb3VyY2UsIGJvb2xlYW4gZ2l2ZW4gaW4gL2hqL3Zhci93d3cvc2VhcmNoLnBocCBvbiBsaW5lIDYxCjxoMiBpZD0ncGFnZU5hbWUnPnNlYXJjaGVkIGZvcjogSGVsbG8gV29ybGQ8L2gyPjwvZGl2Pgo8IS0tIEluc3RhbmNlRW5kRWRpdGFibGUgLS0+CjwhLS1lbmQgY29udGVudCAtLT4KCjxkaXYgaWQ9Im5hdkJhciI+IAogIDxkaXYgaWQ9InNlYXJjaCI+IAogICAgPGZvcm0gYWN0aW9uPSJzZWFyY2gucGhwP3Rlc3Q9cXVlcnkiIG1ldGhvZD0icG9zdCI+IAogICAgICA8bGFiZWw+c2VhcmNoIGFydDwvbGFiZWw+IAogICAgICA8aW5wdXQgbmFtZT0ic2VhcmNoRm9yIiB0eXBlPSJ0ZXh0IiBzaXplPSIxMCI+IAogICAgICA8aW5wdXQgbmFtZT0iZ29CdXR0b24iIHR5cGU9InN1Ym1pdCIgdmFsdWU9ImdvIj4gCiAgICA8L2Zvcm0+IAogIDwvZGl2PiAKICA8ZGl2IGlkPSJzZWN0aW9uTGlua3MiPiAKICAgIDx1bD4gCiAgICAgIDxsaT48YSBocmVmPSJjYXRlZ29yaWVzLnBocCI+QnJvd3NlIGNhdGVnb3JpZXM8L2E+PC9saT4gCiAgICAgIDxsaT48YSBocmVmPSJhcnRpc3RzLnBocCI+QnJvd3NlIGFydGlzdHM8L2E+PC9saT4gCiAgICAgIDxsaT48YSBocmVmPSJjYXJ0LnBocCI+WW91ciBjYXJ0PC9hPjwvbGk+IAogICAgICA8bGk+PGEgaHJlZj0ibG9naW4ucGhwIj5TaWdudXA8L2E+PC9saT4KCSAgPGxpPjxhIGhyZWY9InVzZXJpbmZvLnBocCI+WW91ciBwcm9maWxlPC9hPjwvbGk+CgkgIDxsaT48YSBocmVmPSJndWVzdGJvb2sucGhwIj5PdXIgZ3Vlc3Rib29rPC9hPjwvbGk+CgkJPGxpPjxhIGhyZWY9IkFKQVgvaW5kZXgucGhwIj5BSkFYIERlbW88L2E+PC9saT4KCSAgPC9saT4gCiAgICA8L3VsPiAKICA8L2Rpdj4gCiAgPGRpdiBjbGFzcz0icmVsYXRlZExpbmtzIj4gCiAgICA8aDM+TGlua3M8L2gzPiAKICAgIDx1bD4gCiAgICAgIDxsaT48YSBocmVmPSJodHRwOi8vd3d3LmFjdW5ldGl4LmNvbSI+U2VjdXJpdHkgYXJ0PC9hPjwvbGk+IAoJICA8bGk+PGEgaHJlZj0iaHR0cDovL3d3dy5lY2xlY3Rhc3kuY29tL0ZyYWN0YWwtRXhwbG9yZXIvaW5kZXguaHRtbCI+RnJhY3RhbCBFeHBsb3JlcjwvYT48L2xpPiAKICAgIDwvdWw+IAogIDwvZGl2PiAKICA8ZGl2IGlkPSJhZHZlcnQiPiAKICAgIDxwPgogICAgICA8b2JqZWN0IGNsYXNzaWQ9ImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMCIgY29kZWJhc2U9Imh0dHA6Ly9kb3dubG9hZC5tYWNyb21lZGlhLmNvbS9wdWIvc2hvY2t3YXZlL2NhYnMvZmxhc2gvc3dmbGFzaC5jYWIjdmVyc2lvbj02LDAsMjksMCIgd2lkdGg9IjEwNyIgaGVpZ2h0PSI2NiI+CiAgICAgICAgPHBhcmFtIG5hbWU9Im1vdmllIiB2YWx1ZT0iRmxhc2gvYWRkLnN3ZiI+CiAgICAgICAgPHBhcmFtIG5hbWU9cXVhbGl0eSB2YWx1ZT1oaWdoPgogICAgICAgIDxlbWJlZCBzcmM9IkZsYXNoL2FkZC5zd2YiIHF1YWxpdHk9aGlnaCBwbHVnaW5zcGFnZT0iaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9zaG9ja3dhdmUvZG93bmxvYWQvaW5kZXguY2dpP1AxX1Byb2RfVmVyc2lvbj1TaG9ja3dhdmVGbGFzaCIgdHlwZT0iYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2giIHdpZHRoPSIxMDciIGhlaWdodD0iNjYiPjwvZW1iZWQ+CiAgICAgIDwvb2JqZWN0PgogICAgPC9wPgogIDwvZGl2PiAKPC9kaXY+IAoKPCEtLWVuZCBuYXZiYXIgLS0+IAo8ZGl2IGlkPSJzaXRlSW5mbyI+ICA8YSBocmVmPSJodHRwOi8vd3d3LmFjdW5ldGl4LmNvbSI+QWJvdXQgVXM8L2E+IHwgPGEgaHJlZj0icHJpdmFjeS5waHAiPlByaXZhY3kgUG9saWN5PC9hPiB8IDxhIGhyZWY9Im1haWx0bzp3dnNAYWN1bmV0aXguY29tIj5Db250YWN0IFVzPC9hPiB8ICZjb3B5OzIwMDYKICBBY3VuZXRpeCBMdGQgCjwvZGl2PiAKPGJyPiAKPC9kaXY+CjwvYm9keT4KPCEtLSBJbnN0YW5jZUVuZCAtLT48L2h0bWw+Cg=="
                        }
                    }
                }
            ]
        });

        return <div>
            <Header>
                <Col xs={12}>
                    <h2 style={headerStyle}>
                        <SeverityIcon
                            severity={severity}
                            size={37}
                            style={iconStyle}/>

                        <div>
                            {summary}
                            <br/>
                            <small>{vectorUrl}</small>
                        </div>
                    </h2>
                </Col>
            </Header>
            <Row>
                <Col xs={12} md={8}>
                    {desc && <Ibox style={aStyle}>
                        <IboxTitle title={iget('Description')}/>
                        <IboxContent>
                            <Markdown text={desc}/>
                        </IboxContent>
                    </Ibox>}
                    <Ibox style={aStyle}>
                        <IboxTitle>
                            {iget('References')}
                        </IboxTitle>
                        {hasReferences && <IboxContent>
                            <References references={references}/>
                        </IboxContent>}
                    </Ibox>
                    <Ibox style={aStyle}>
                        <IboxTitle title={iget('Vector data')}/>
                        <IboxContent>
                            <Vector vector={vector}/>
                        </IboxContent>
                    </Ibox>
                </Col>
                <Col xs={12} md={4}>
                    <Ibox style={aStyle}>
                        <IboxTitle title={iget('Activities')}/>
                        {hasActivities && <IboxContent>
                            <IssueActivities activities={activities}/>
                        </IboxContent>}
                    </Ibox>
                    <Ibox style={aStyle}>
                        <IboxTitle title={iget('Comments')}/>
                        <IboxContent>
                            <CommentForm/>
                        </IboxContent>
                    </Ibox>
                </Col>
            </Row>
        </div>;
    }
}

Issue.propTypes = {
    issue: Model
};

