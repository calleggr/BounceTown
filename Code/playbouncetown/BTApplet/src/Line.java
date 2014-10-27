import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;


public class Line {
	private Point2D p1;
	private Point2D p2;
	private Color color = Color.RED;
	private boolean finalized;
	
	
	
	public Line(){
		this.p1 = null;
		this.p2 = null;
		this.finalized = false;
	}
	
	public void finalize(){
		this.finalized = true;
		this.color = Color.green;
	}
	
	public void clear(){
		this.p1 = null;
		this.p2 = null;
		this.color = Color.red;
		this.finalized = false;
	}
	
	public void assignPoints(Point2D newP1, Point2D newP2){
		this.p1 = newP1;
		this.p2 = newP2;
	}
	
	public Shape getShape(){
		if(this.p1 == null || this.p2 == null){
			return null;
		}
		return new Line2D.Double(this.p1, this.p2);
	}
	
	public Color getColor(){
		return this.color;
	}
	
	public Point2D getPointOne(){
		return this.p1;
	}
	public Point2D getPointTwo(){
		return this.p2;
	}
	
	public double slope(){
		double dy = -(this.p2.getY()-this.p1.getY());
		double dx = (this.p2.getX()-this.p1.getX());
		return (dy/dx);
	}
}
