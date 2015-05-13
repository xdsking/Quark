/**
 * Created by Administrator on 2014/11/11.
 */
var leb1 =
{
    "dojoType": "onemap/widget/IntegratedQuery/LazyTreeGridX",
    "lazyTreeGridParams": {
        "containerParams": {
            "containerId": "b5929b31ec3f4a94b14e8b5df7dd378c",
            "containerType": "onemap/FloatingPane",
            "containerParams": {
                "title": "查询结果",
                "style": {
                    "top": "25px",
                    "right": "6px",
                    "height": "530px"
                }
            }
        },
        "style": "",
        "identifier": "OBJECTID",
        "XMLabel": "XIANGMMC",
        "DKLabel": "DKMC",
        "attributesLabel": [
            "XIANGMMC",
            "DKMC"
        ]
    },
    "overlapAnalysisParams": {},
    "isShowFeaturesOnMap": true
};

var leb2={
    "dojoType": "onemap/widget/IntegratedQuery/IntegratedResultManager",
    "queryParams": {
        "type": "onemap/widget/IntegratedQuery/LazyTreeGridX",
        "params": {
            "style": "",
            "identifier": "OBJECTID",
            "XMLabel": "XIANGMMC",
            "DKLabel": "DKMC",
            "attributesLabel": [
                "XIANGMMC",
                "DKMC"
            ]
        },
        "container": {
            "id": "b5929b31ec3f4a94b14e8b5df7dd378c",
            "type": "onemap/FloatingPane",
            "params": {
                "title": "查询结果",
                "style": {
                    "top": "25px",
                    "right": "6px",
                    "height": "530px"
                }
            }
        },
        "isShowFeaturesOnMap": true
    },
    "overlapAnalysisParams": {
        "type": "onemap/widget/IntegratedQuery/LazyTreeGridX",
        "params": {
            "style": "",
            "identifier": "OBJECTID",
            "XMLabel": "XIANGMMC",
            "DKLabel": "DKMC",
            "attributesLabel": [
                "XIANGMMC",
                "DKMC"
            ]
        },
        "container": {
            "id": "b5929b31ec3f4a94b14e8b5df7dd378c",
            "type": "onemap/FloatingPane",
            "params": {
                "title": "分结果",
                "style": {
                    "top": "25px",
                    "right": "6px",
                    "height": "530px"
                }
            }
        }
    }
};
